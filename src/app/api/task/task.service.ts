import { AppDataSource } from "../../database/datasource";
import { OrganizationEntity } from "../organization/organization.entity";
import { UserEntity } from "../user/user.entity";
import { TaskEntity } from "./task.entity";

class TaskService {
  constructor(
    private taskRepository = AppDataSource.getRepository(TaskEntity)
  ) {}

  async createTask(taskDto: TaskEntity) {
    return await this.taskRepository.save(taskDto);
  }

  async getTasks(user: UserEntity, organization: OrganizationEntity) {
    return await this.taskRepository.find({
      where: { assignedTo: user, organization },
    });
  }

  async getTaskById(id: number) {
    return await this.taskRepository.findBy({ id });
  }

  async updateTaskById(id: number, updateTaskDto) {
    return await this.taskRepository.update({ id }, updateTaskDto);
  }

  async deleteTaskById(id: number) {
    return await this.taskRepository.delete({ id });
  }
}

export const taskService = new TaskService();
