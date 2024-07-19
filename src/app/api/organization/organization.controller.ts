import { NextFunction, Request, Response } from "express";
import { organizationService } from "./organization.service";
import { AuthenticatedRequest } from "../../common/middleware/auth-middleware";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
} from "swagger-express-ts";

@ApiPath({
  path: "/organization",
  name: "Organization",
  security: { apiKeyHeader: [] },
})
class OrganizationController {
  @ApiOperationGet({
    description: "Get all organizations",
    summary: "Get all organizations",
    path: "",
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  getOrganizations(req: Request, res: Response, next: NextFunction) {
    const user = (req as AuthenticatedRequest).user;
    organizationService
      .getOrganizations(user)
      .then((result) =>
        res.success("Organizations fetched Successfully", result)
      )
      .catch(next);
  }

  @ApiOperationPost({
    path: "/",
    parameters: {
      body: {
        required: true,
        model: "CreateOrganizationDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
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

  @ApiOperationGet({
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
    },
    responses: {
      200: {
        type: "String",
      },
    },
  })
  getOrganizationById(req: Request, res: Response, next: NextFunction) {
    organizationService
      .getOrganizationById(+req.params.id)
      .then((result) =>
        res.success("Organization fetched Successfully", result)
      )
      .catch(next);
  }

  @ApiOperationPost({
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
      body: {
        required: true,
        model: "AddUserToOrganizationDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  addUserToOrganization(req: Request, res: Response, next: NextFunction) {
    let orgId = +req.params.id;
    const user = (req as AuthenticatedRequest).user;
    organizationService
      .addUserToOrganization(orgId, user, req.body)
      .then((result) =>
        res.success("User added in organization Successfully", result)
      )
      .catch(next);
  }

  @ApiOperationPut({
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
      body: {
        required: true,
        model: "UpdateOrganizationDto",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
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

  @ApiOperationDelete({
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
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
