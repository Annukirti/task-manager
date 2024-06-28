import { NextFunction, Request, Response } from "express";
import { organizationService } from "./organization.service";
import { AuthenticatedRequest } from "../../common/middleware/auth-middleware";

class OrganizationController {
  getOrganizations(req: Request, res: Response, next: NextFunction) {
    const user = (req as AuthenticatedRequest).user;
    organizationService
      .getOrganizations(user)
      .then((result) =>
        res.success("Organizations fetched Successfully", result)
      )
      .catch(next);
  }

  createOrganization(req: Request, res: Response, next: NextFunction) {
    const createOrganizationDto = req.body;
    const user = (req as AuthenticatedRequest).user;
    organizationService
      .createOrganization(createOrganizationDto, user)
      .then((result) =>
        res.success("Organizations created Successfully", result)
      )
      .catch(next);
  }

  getOrganizationById(req: Request, res: Response, next: NextFunction) {
    organizationService
      .getOrganizationById(+req.params.id)
      .then((result) =>
        res.success("Organization fetched Successfully", result)
      )
      .catch(next);
  }

  addUserToOrganization(req: Request, res: Response, next: NextFunction) {
    let orgId = +req.params.id;
    const user = (req as AuthenticatedRequest).user;
    const userToAdd = req.body.userId;
    organizationService
      .addUserToOrganization(orgId, user, userToAdd)
      .then((result) =>
        res.success("User added in organization Successfully", result)
      )
      .catch(next);
  }

  updateOrganizationById(req: Request, res: Response, next: NextFunction) {
    const updateOrganizationDto = req.body;
    const user = (req as AuthenticatedRequest).user;
    organizationService
      .updateOrganizationById(user, +req.params.id, updateOrganizationDto)
      .then((result) =>
        res.success("Organization updated Successfully", result)
      )
      .catch(next);
  }

  deleteOrganizationById(req: Request, res: Response, next: NextFunction) {
    const user = (req as AuthenticatedRequest).user;
    organizationService
      .deleteOrganizationById(+req.params.id, user)
      .then((result) =>
        res.success("Organization deleted Successfully", result)
      )
      .catch(next);
  }
}

export const organizationController = new OrganizationController();
