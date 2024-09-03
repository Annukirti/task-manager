import { Router } from "express";
import { authenticate, validateDto } from "../../common";

const router: Router = Router();

// router.post("", validateDto(CreateUserDto), userController.createUser);

// router.post("/login", validateDto(LoginDto), userController.login);

// router.post("/logout", authenticate, userController.logout);

// router.get("/", authenticate, userController.getUsers);

export const requestRoutes = router;
