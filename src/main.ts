import express from "express";
import { AppDataSource } from "./app/database/datasource";
import { config } from "./app/config/configuration";
import { apiRouter } from "./app/api/api.module";
import bodyParser from "body-parser";
import { apiMiddleware } from "./app/common/middleware/api";
import { ResponseError } from "./app/common/utils/error.utils";
import * as swagger from "swagger-express-ts";

const app = express();

const port: number = config.server.port;

app.use(bodyParser.json());

function initSwagger() {
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );

  app.use(
    swagger.express({
      definition: {
        info: {
          title: "My api",
          version: "2.0",
        },
        basePath: `/${config.server.apiPrefix}`,
        schemes: ["http", "https"],
        securityDefinitions: {
          apiKeyHeader: {
            type: "apiKey",
            in: "header",
            name: "authorization",
          },
        },
      },
    })
  );
}
app.use(express.json());

// Custom Middleware
app.use(apiMiddleware);
initSwagger();
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
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on ${config.server.url}${port}`);
      console.log(`Swagger URL "${config.server.url}${port}/api-docs/swagger`);
    });
  })
  .catch((error) => console.log(error));
