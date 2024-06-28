import { Entity, Column, OneToMany } from "typeorm";
import { UserOrganizationEntity } from "./user-organization.entity";
import { User } from "../../common/interfaces";
import { TaskEntity } from "../task/task.entity";
import { CoreEntity } from "../core.entity";
import { Role } from "../../common";

@Entity({ name: "user" })
export class UserEntity extends CoreEntity implements User {
  @Column({ name: "username", type: "varchar", unique: true, nullable: false })
  username: string;

  @Column({ name: "email", type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "role", enum: Role, default: Role.GENERAL })
  role: Role;

  @OneToMany(() => UserOrganizationEntity, (userOrg) => userOrg.user)
  userOrganizations: UserOrganizationEntity[];

  @OneToMany(() => TaskEntity, (task) => task.assignedTo)
  tasks: TaskEntity[];
}
