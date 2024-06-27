import { NextFunction, Request, Response } from "express";
import { organizationService } from "./organization.service";

class OrganizationController {
  getOrganizations(req: Request, res: Response, next: NextFunction) {
    organizationService
      .getOrganizations()
      .then((result) =>
        res.success("Organizations fetched Successfully", result)
      )
      .catch(next);
  }

  createOrganization(req: Request, res: Response, next: NextFunction) {
    const createOrganizationDto = req.body;
    organizationService
      .createOrganization(createOrganizationDto)
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
    let userId = req.body;
    organizationService
      .addUserToOrganization(orgId, userId)
      .then((result) =>
        res.success("User added in organization Successfully", result)
      )
      .catch(next);
  }

  updateOrganizationById(req: Request, res: Response, next: NextFunction) {
    const updateOrganizationDto = req.body;
    organizationService
      .updateOrganizationById(+req.params.id, updateOrganizationDto)
      .then((result) =>
        res.success("Organization updated Successfully", result)
      )
      .catch(next);
  }

  deleteOrganizationById(req: Request, res: Response, next: NextFunction) {
    organizationService
      .deleteOrganizationById(+req.params.id)
      .then((result) =>
        res.success("Organization deleted Successfully", result)
      )
      .catch(next);
  }
}

export const organizationController = new OrganizationController();
