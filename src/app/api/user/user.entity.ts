import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserOrganizationEntity } from "./user-organization.entity";
import { User } from "../../common/interfaces";
import { TaskEntity } from "../task/task.entity";

@Entity({ name: "user" })
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => UserOrganizationEntity, (userOrg) => userOrg.user)
  userOrganizations: UserOrganizationEntity[];

  @OneToMany(() => TaskEntity, (task) => task.assigned_to)
  tasks: TaskEntity[];
}
