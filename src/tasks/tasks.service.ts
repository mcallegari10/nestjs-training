import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/createTask.dto';
import { GetTasksFilterDTO } from './dto/getTasksFilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
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
    const found = this.getById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return this.getAllTasks();
  }

  changeTaskStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getById(id);
    task.status = newStatus;
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }
    return tasks;
  }
}
