import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    port: +(process.env.PORT || 8000),
    env: process.env.NODE_ENV || "development",
    apiPrefix: process.env.API_PREFIX || "api",
    url: process.env.URL || "http://localhost:",
  },
  database: {
    host: process.env.API_DB_HOST || "localhost",
    port: Number(process.env.API_DB_PORT || 5432),
    username: process.env.API_DB_USERNAME || "postgres",
    password: process.env.API_DB_PASSWORD || "admin",
    database: process.env.API_DB_NAME || "task-manager-db",
  },
  jwt: {
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    expiresTime: process.env.EXPIRES_TIME || "1h",
  },
};
