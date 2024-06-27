import { AppDataSource } from "../../database/datasource";
import { TaskEntity } from "./task.entity";

class TaskService {
  constructor(
    private taskRepository = AppDataSource.getRepository(TaskEntity)
  ) {}

  async createTask(taskDto) {
    return await this.taskRepository.save(taskDto);
  }

  async getTasks() {
    return await this.taskRepository.find();
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
