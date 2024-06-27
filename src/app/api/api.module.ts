import { Router } from "express";
import { userRoutes } from "./user/user.routes";
import { taskRoutes } from "./task/task.routes";
import { organizationRoutes } from "./organization/organization.routes";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/organization", organizationRoutes);
export const apiRouter = router;
