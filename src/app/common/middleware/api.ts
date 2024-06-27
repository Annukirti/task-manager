import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/error.utils";

export type SuccessStatus = 200 | 201 | 202 | 204;

declare global {
  namespace Express {
    interface Response {
      error(error: ResponseError): void;
      success(message: string, result?: any, status?: SuccessStatus): void;
    }
  }
}
export function apiMiddleware(req: Request, res: Response, next: NextFunction) {
  res.success = function (
    this: Response,
    message: string,
    result: any = null,
    status: SuccessStatus = 200
  ) {
    this.status(status).json({ message, result });
  };
  res.error = function (this: Response, { status, message }: ResponseError) {
    message =
      message || "Sorry! we couldn't process your request, please try later!";
    this.status(status || 500).json({ message, errorCode: 0 });
  };
  next();
}
