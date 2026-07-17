import "dotenv/config";
import app from "./server.js";
import { logger } from "./config/logger.js";

const port = Number(process.env.PORT) || 5000;

const server = app.listen(port, () => {
  logger.info({ port }, "Server started");
});

server.on("error", (error) => {
  logger.fatal({ err: error }, "Server failed to start");
  process.exit(1);
});
