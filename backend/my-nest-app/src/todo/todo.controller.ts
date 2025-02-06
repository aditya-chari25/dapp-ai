import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTask(@Body('description') description: string) {
    return this.todoService.createTask(description);
  }

  @Patch(':id')
  async updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('isDone') isDone: boolean) {
    return this.todoService.updateTaskStatus(id, isDone);
  }

  @Get(':id')
  async getTask(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTask(id);
  }

  @Get()
  async getAllTasks() {
    return this.todoService.getAllTasks();
  }
}
