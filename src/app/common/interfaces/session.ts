import { Organization } from "./organization";
import { User } from "./user";

export interface Session {
  id: number;
  user: User;
  token: string;
  current_organization: Organization;
  expires_at: Date;
}
