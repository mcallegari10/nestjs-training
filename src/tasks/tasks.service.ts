import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.getAllTasks();
  }

  changeTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getById(id);
    task.status = newStatus;
    return task;
  }
}
