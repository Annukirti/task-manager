import * as swagger from "swagger-express-ts";
import { config } from "../config/configuration";
import express from "express";
import { Express } from "express";

export function initSwagger(app: Express) {
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );

  app.use(
    swagger.express({
      definition: {
        info: {
          title: "Task Manager",
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
