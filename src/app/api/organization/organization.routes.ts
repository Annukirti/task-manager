import { Router } from "express";
import { organizationController } from "./organization.controller";
import { validateDto } from "../../common/middleware/validation-middleware";
import {
  AddUserToOrganizationDto,
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from "./organization.dto";
import { authenticate } from "../../common/middleware/auth-middleware";

const router: Router = Router();

router.get("/", authenticate, organizationController.getOrganizations);

router.get("/:id", authenticate, organizationController.getOrganizationById);

router.post(
  "",
  authenticate,
  validateDto(CreateOrganizationDto),
  organizationController.createOrganization
);

router.post(
  "/:id",
  authenticate,
  validateDto(AddUserToOrganizationDto),
  organizationController.addUserToOrganization
);

router.put(
  "/:id",
  authenticate,
  validateDto(UpdateOrganizationDto),
  organizationController.updateOrganizationById
);

router.delete(
  "/:id",
  authenticate,
  organizationController.deleteOrganizationById
);

export const organizationRoutes = router;
