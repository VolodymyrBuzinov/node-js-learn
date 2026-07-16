import { HTTP_STATUS_CODES } from "@/config/consts.js";
import { AppError } from "@/services/appError.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { fileTypeStream } from "file-type";
import { Readable } from "node:stream";

const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024;
const DEFAULT_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type ImageMimeType = keyof typeof IMAGE_EXTENSIONS;

export type ValidatedImageUpload = {
  stream: ReadableStream<Uint8Array>;
  contentType: ImageMimeType;
  extension: (typeof IMAGE_EXTENSIONS)[ImageMimeType];
};

type ImageUploadMiddlewareOptions = {
  maxSizeBytes?: number;
  allowedMimeTypes?: readonly ImageMimeType[];
};

const createSizeLimitedStream = (
  stream: ReadableStream<Uint8Array>,
  maxSizeBytes: number
) => {
  let receivedBytes = 0;

  return stream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        receivedBytes += chunk.byteLength;

        if (receivedBytes > maxSizeBytes) {
          controller.error(
            new AppError(
              HTTP_STATUS_CODES.PAYLOAD_TOO_LARGE,
              `Image must be smaller than ${maxSizeBytes} bytes`,
              "IMAGE_TOO_LARGE"
            )
          );
          return;
        }

        controller.enqueue(chunk);
      },
    })
  );
};

export const validateImageUpload = ({
  maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
  allowedMimeTypes = DEFAULT_ALLOWED_MIME_TYPES,
}: ImageUploadMiddlewareOptions = {}) =>
  asyncHandler(async (req, res, next) => {
    const contentLength = Number(req.headers["content-length"]);

    if (Number.isFinite(contentLength) && contentLength > maxSizeBytes) {
      req.resume();
      throw new AppError(
        HTTP_STATUS_CODES.PAYLOAD_TOO_LARGE,
        `Image must be smaller than ${maxSizeBytes} bytes`,
        "IMAGE_TOO_LARGE"
      );
    }

    const requestStream = Readable.toWeb(req) as ReadableStream<Uint8Array>;
    const detectedStream = await fileTypeStream(requestStream);
    const contentType = detectedStream.fileType?.mime as
      | ImageMimeType
      | undefined;

    if (!contentType || !allowedMimeTypes.includes(contentType)) {
      await detectedStream.cancel();
      throw new AppError(
        HTTP_STATUS_CODES.BAD_REQUEST,
        "File must be a JPEG, PNG, or WebP image",
        "INVALID_IMAGE_TYPE"
      );
    }

    res.locals.imageUpload = {
      stream: createSizeLimitedStream(
        detectedStream as unknown as ReadableStream<Uint8Array>,
        maxSizeBytes
      ),
      contentType,
      extension: IMAGE_EXTENSIONS[contentType],
    } satisfies ValidatedImageUpload;

    next();
  });
