// src/middleware/validation.ts
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors = errors.map((error) =>
          Object.values(error.constraints ?? {}).join(", ")
        );
        res.status(400).json({ errors: dtoErrors });
      } else {
        next();
      }
    });
  };
};
