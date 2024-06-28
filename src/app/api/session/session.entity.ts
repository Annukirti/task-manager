import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { OrganizationEntity } from "../organization/organization.entity";
import { Session } from "../../common";
import { CoreEntity } from "../core.entity";

@Entity()
export class SessionEntity extends CoreEntity implements Session {
  @Column({ name: "user_id", type: "bigint", nullable: true })
  userId?: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ name: "token", nullable: false })
  token: string;

  @Column({ name: "current_organization_id", type: "bigint", nullable: true })
  currentOrganizationId?: number;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: "current_organization_id" })
  currentOrganization: OrganizationEntity;

  @Column({ name: "expires_at" })
  expiresAt: Date;
}
