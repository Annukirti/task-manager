import express from "express";
import { AppDataSource } from "./app/database/datasource";
import { config } from "./app/config/configuration";
import { apiRouter } from "./app/api/api.module";
import bodyParser from "body-parser";

const app = express();

const port: number = config.server.port;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(`/${config.server.apiPrefix}`, apiRouter);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}/${config.server.apiPrefix}`
  );
});
