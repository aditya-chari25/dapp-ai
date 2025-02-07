import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // ✅ Create a New Task
  @Post()
  async createTask(@Body() body: { description: string; deadline: number }) {
    return this.todoService.createTask(body.description, body.deadline);
  }

  // ✅ Get All Tasks
  @Get()
  async getAllTasks() {
    return this.todoService.getAllTasks();
  }

  // ✅ Delete a Task (Mark as Done)
  @Delete(":taskId")
  async deleteTask(@Param("taskId") taskId: string) {
    return this.todoService.deleteTask(Number(taskId));
  }
}
