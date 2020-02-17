import { getLogger } from "@utils/logger";
import { getServerConfig } from "@config";
import { AppServer } from "./src";
const logger = getLogger("Starting app");

async function start() {
  try {
    logger.info(`NODE_ENV = ${process.env.NODE_ENV}`);
    const server = new AppServer(getServerConfig());
    await server.start();
    return server;
  } catch (error) {
    logger.error(`Cannot start app ${error.stack}`);
  }
}
start();
