import { NextFunction, Request, Response } from "express";
import { sessionService } from "./session.service";

class SessionController {
  async getCurrentSession(req: Request, res: Response, next: NextFunction) {
    const userId = +req.params.id;
    sessionService
      .getCurrentSession(userId)
      .then((result) => res.success("Session fetched Successfully", result))
      .catch(next);
  }

  async createSession(req: Request, res: Response, next: NextFunction) {
    const { userId, organizationId } = req.body;
    sessionService
      .createSession(userId, organizationId)
      .then((result) => res.success("Session created Successfully", result))
      .catch(next);
  }

  async switchOrganization(req: Request, res: Response, next: NextFunction) {
    const userId = +req.params.id;
    sessionService
      .switchOrganization(userId, req.body)
      .then((result) =>
        res.success("Organization switched Successfully", result)
      )
      .catch(next);
  }

  async deleteUserSessions(req: Request, res: Response, next: NextFunction) {
    const userId = +req.params.id;
    sessionService
      .deleteUserSessions(userId)
      .then((result) => res.success("Session deleted Successfully", result))
      .catch(next);
  }
}

export const sessionController = new SessionController();
