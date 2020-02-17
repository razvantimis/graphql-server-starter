import cors from "@koa/cors";
import { AuthenticationError } from "apollo-server-errors";
import { Server as HttpServer } from "http";
import Application, { Middleware } from "koa";
import bodyParser from "koa-bodyparser";
import { getGraphqlServer } from "./app/graphql-server";
import { ServerConfig } from "./server-config";
import { getFirebaseApp } from "./utils/firebase";
import { getLogger } from "./utils/logger";

const logger = getLogger("Config app");

export class AppServer {
  private app: Application;
  private graphqlServer: any;
  private config: ServerConfig;
  public listeningServer?: HttpServer;

  constructor(config: ServerConfig) {
    logger.info("Create KOA Server");

    this.app = new Application();
    this.config = config;

    this.configMiddlewares();
    this.configGraphql();
  }

  async configMiddlewares() {
    this.app.use(
      cors({
        origin: "*"
      })
    );
    this.app.use(bodyParser());
    this.app.use(this.authMiddleware);
    logger.info("Config KOA Middlewares");
  }

  async configGraphql() {
    this.graphqlServer = await getGraphqlServer();
    this.graphqlServer.applyMiddleware({ app: this.app });
    logger.info("Config Graphql");
  }

  authMiddleware: Middleware = async (ctx, next) => {
    const authorizationHeader: string = ctx.request.header.authorization || "";
    const token = authorizationHeader.replace("Bearer ", "");

    logger.info("Token: " + token);
    if (!token) {
      throw new AuthenticationError("You must be logged");
    } else {
      try {
        const decodeIdToken = await getFirebaseApp()
          .auth()
          .verifyIdToken(token);
        const user = await getFirebaseApp()
          .auth()
          .getUser(decodeIdToken.uid);
        ctx.state.user = user;
      } catch (e) {
        logger.error(e);
        throw new AuthenticationError("You must be logged");
      }
    }
    await next();
  };

  async start() {
    const port = process.env.PORT || this.config.port;
    this.listeningServer = this.app.listen(
      port,
      "0.0.0.0" as any,
      (error?: any) => {
        if (error) {
          logger.error("Error while trying to open server.", error);
        } else {
          logger.info(`Server started on port: ${port}`);
        }
      }
    );
    return this.listeningServer!;
  }
}
