import { Router } from "express";
import { userRoutes } from "./user/user.routes";
import { taskRoutes } from "./task/task.routes";
import { organizationRoutes } from "./organization/organization.routes";
import { sessionRoutes } from "./session/session.routes";
import { authenticate } from "../common";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/task", authenticate, taskRoutes);
router.use("/organization", authenticate, organizationRoutes);
router.use("/session", sessionRoutes);
export const apiRouter = router;
