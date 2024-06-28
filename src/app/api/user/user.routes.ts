import { Router } from "express";
import { userController } from "./user.controller";
import { authenticate } from "../../common/middleware/auth-middleware";
import { validateDto } from "../../common/middleware/validation-middleware";
import { CreateUserDto, LoginDto, UpdateUserDto } from "./user.dto";

const router: Router = Router();

router.post("", validateDto(CreateUserDto), userController.createUser);

router.post("/login", validateDto(LoginDto), userController.login);

router.get("/", authenticate, userController.getUsers);

router.get("/:id", authenticate, userController.getUserById);

router.put(
  "/:id",
  authenticate,
  validateDto(UpdateUserDto),
  userController.updateUserById
);

router.delete("/:id", authenticate, userController.deleteUserById);

export const userRoutes = router;
