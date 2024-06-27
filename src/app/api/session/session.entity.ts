import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { OrganizationEntity } from "../organization/organization.entity";
import { Session } from "../../common";

@Entity()
export class SessionEntity implements Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id", type: "bigint", nullable: true })
  userId?: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column()
  token: string;

  @Column({ name: "current_organization_id", type: "bigint", nullable: true })
  currentOrganizationId?: number;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: "current_organization_id" })
  current_organization: OrganizationEntity;

  @Column()
  expires_at: Date;
}
