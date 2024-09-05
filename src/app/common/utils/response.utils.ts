import { plainToInstance } from "class-transformer";
import { ResponseError } from "./error.utils";

export const transformUser = (data: any | any[], entity) => {
  if (
    (Array.isArray(data) && data.length && data[0] instanceof entity) ||
    data instanceof entity
  ) {
    console.log(data);

    return plainToInstance(entity, data);
  } else {
    return Promise.reject(new ResponseError(404, "Invalid Data"));
  }
};
