import express from "express";
import { AppDataSource } from "./app/database/datasource";
import { config } from "./app/config/configuration";
import { apiRouter } from "./app/api/api.module";
import bodyParser from "body-parser";
import {
  apiMiddleware,
  morganMiddleware,
  initSwagger,
  Logger,
  ResponseError,
} from "./app/common";
const app = express();
app.use(morganMiddleware);

const port: number = config.server.port;

app.use(bodyParser.json());

app.use(express.json());

// Custom Middleware
app.use(apiMiddleware);
// Swagger
initSwagger(app);
// Routes
app.use(`/${config.server.apiPrefix}`, apiRouter);

// Error Handling Middleware
app.use(
  (
    err: ResponseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Logger.error(err.message);
    res.status(err.status || 400).json({ message: err.message });
  }
);

// 404 Handling Middleware
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Initialize Database and Start Server
AppDataSource.initialize()
  .then(() => {
    Logger.info("Connected to the database");
    app.listen(port, () => {
      Logger.info(`Server is running on ${config.server.url}${port}`);
      Logger.info(`Swagger URL "${config.server.url}${port}/api-docs/swagger`);
    });
  })
  .catch((error) => Logger.error(error));
