import { Organization } from "./organization";
import { User } from "./user";

export interface Session {
  id?: number;
  user: User;
  token: string;
  currentOrganization: Organization;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
