import { DataSource } from "typeorm";
import { join } from "path";
import { config } from "../config/configuration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host || "localhost",
  port: Number(config.database.port || 5432),
  username: config.database.username || "postgres",
  password: config.database.password || "admin",
  database: config.database.database || "task-manager-db",
  synchronize: true,
  logging: true,
  entities: [join(__dirname, "../api/**/*.entity{.ts,.js}")],
  subscribers: [],
  migrations: [],
});
