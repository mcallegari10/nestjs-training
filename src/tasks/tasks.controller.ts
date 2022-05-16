import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/createTask.dto';
import { GetTasksFilterDTO } from './dto/getTasksFilter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get(':id')
  getById(@Param('id') id: string): Task {
    return this.taskService.getById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Task[] {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.changeTaskStatus(id, status);
  }
}
