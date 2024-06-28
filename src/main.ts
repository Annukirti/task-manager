import express from "express";
import { AppDataSource } from "./app/database/datasource";
import { config } from "./app/config/configuration";
import { apiRouter } from "./app/api/api.module";
import bodyParser from "body-parser";
import { apiMiddleware } from "./app/common/middleware/api";
import { ResponseError } from "./app/common/utils/error.utils";

const app = express();

const port: number = config.server.port;

app.use(bodyParser.json());
app.use(express.json());

// Custom Middleware
app.use(apiMiddleware);

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
      console.log(
        `Server is running on http://localhost:${port}/${config.server.apiPrefix}`
      );
    });
  })
  .catch((error) => console.log(error));
