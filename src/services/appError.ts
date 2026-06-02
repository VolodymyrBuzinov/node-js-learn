export class AppError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly isOperational = true
  ) {
    super(message);
    this.name = "AppError";
  }
}
