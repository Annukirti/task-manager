import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SessionEntity } from "../../api/session/session.entity";
import { AppDataSource } from "../../database/datasource";
import { config } from "../../config/configuration";
import { OrganizationEntity } from "../../api/organization/organization.entity";

interface AuthenticatedRequest extends Request {
  user?: number;
  organization?: OrganizationEntity;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    // res.status(401).send("Unauthorized");
    // return;
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    const sessionRepository = AppDataSource.getRepository(SessionEntity);
    const session = await sessionRepository.findOne({ where: { token } });
    if (!session) {
      // res.status(401).send("Session expired");
      // return;
      throw new Error("Session expired");
    }
    (req as AuthenticatedRequest).user = decoded.userId;
    (req as AuthenticatedRequest).organization = session.currentOrganization;
    next();
  } catch (error: any) {
    res.status(401).send(`Invalid token: ${error}`);
  }
};
