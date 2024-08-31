import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
} from "swagger-express-ts";

@ApiPath({
  path: "/user",
  name: "User",
})
class UserController {
  @ApiOperationPost({
    description: "Post user object",
    summary: "Post new user",
    parameters: {
      body: {
        description: "User Register Data",
        required: true,
        model: "CreateUserDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  createUser(req: Request, res: Response, next: NextFunction) {
    userService
      .createUser(req.body)
      .then((result) => res.success("User Created Successfully", result))
      .catch(next);
  }

  @ApiOperationPost({
    description: "Login user",
    summary: "Login existing user",
    path: "/login",
    parameters: {
      body: {
        description: "User Login Data",
        required: true,
        model: "LoginUserDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  login(req: Request, res: Response, next: NextFunction) {
    userService
      .login(req.body)
      .then((result) => res.success("Logged in Successfully", result))
      .catch(next);
  }

  @ApiOperationPost({
    description: "Logout user",
    summary: "Logout existing user",
    path: "/logout",
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  logout(req: Request, res: Response, next: NextFunction) {
    userService
      .logout(req)
      .then(() => res.success("Logged out Successfully"))
      .catch(next);
  }

  @ApiOperationGet({
    description: "Get all users",
    summary: "Get all users",
    path: "",
    security: { apiKeyHeader: [] },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  getUsers(req: Request, res: Response, next: NextFunction) {
    return userService
      .getUsers()
      .then((result) => res.success("Users fetched Successfully", result))
      .catch(next);
  }

  @ApiOperationGet({
    description: "Get user by ID",
    summary: "Get user by ID",
    path: "/{id}",
    security: { apiKeyHeader: [] },
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          description: "ID of user to fetch",
          type: "number",
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  getUserById(req: Request, res: Response, next: NextFunction) {
    userService
      .getUserById(+req.params.id)
      .then((result) => res.success("User fetched Successfully", result))
      .catch(next);
  }

  @ApiOperationPut({
    description: "Update user by ID",
    summary: "Update user by ID",
    path: "/{id}",
    security: { apiKeyHeader: [] },
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          description: "ID of user to update",
          type: "number",
        },
      },
      body: {
        description: "User Update Data",
        required: true,
        model: "UpdateUserDto",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  updateUserById(req: Request, res: Response, next: NextFunction) {
    userService
      .updateUserById(+req.params.id, req.body)
      .then((result) => res.success("User updated Successfully", result))
      .catch(next);
  }

  @ApiOperationDelete({
    description: "Delete user by ID",
    summary: "Delete user by ID",
    path: "/{id}",
    security: { apiKeyHeader: [] },
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          description: "ID of user to delete",
          type: "number",
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  deleteUserById(req: Request, res: Response, next: NextFunction) {
    userService
      .deleteUserById(+req.params.id)
      .then((result) => res.success("User deleted Successfully", result))
      .catch(next);
  }

  @ApiOperationPost({
    description: "Forgot Password",
    summary: "Forgot the App Password",
    path: "/forgot-password",
    parameters: {
      body: {
        description: "Forgot Password DTO",
        required: true,
        model: "ForgotPasswordDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  forgotPassword(req: Request, res: Response, next: NextFunction) {
    userService
      .forgotPassword(req.body)
      .then((result) =>
        res.success("Password reset link sent to your email account", result)
      )
      .catch(next);
  }

  @ApiOperationPost({
    description: "Reset Password",
    summary: "Reset the App Password",
    path: "/reset-password",
    parameters: {
      body: {
        description: "Reset Password DTO",
        required: true,
        model: "ResetPasswordDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  resetPassword(req: Request, res: Response, next: NextFunction) {
    userService
      .resetPassword(req.body)
      .then(() => res.success("Password Reset Successfully. Please login."))
      .catch(next);
  }
}

export const userController = new UserController();
