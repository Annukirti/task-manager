import { Router } from "express";
import { organizationController } from "./organization.controller";

const router: Router = Router();

router.get("/", organizationController.getOrganizations);

router.get("/:id", organizationController.getOrganizationById);

router.post("", organizationController.createOrganization);

router.post("/:id", organizationController.addUserToOrganization);

router.put("/:id", organizationController.updateOrganizationById);

router.delete("/:id", organizationController.deleteOrganizationById);

export const organizationRoutes = router;
