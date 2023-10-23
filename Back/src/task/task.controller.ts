import { Controller, UseGuards, Post, Get, Delete, Req, Res, Body, Param, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post("new")
  @UseGuards(JwtAuthGuard)
  async newTask(@Body() dto: TaskDto, @Req() req, @Res() res) {
    console.log("new task")
    return this.taskService.newTask(dto, req, res);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @Req() req) {
    return this.taskService.deleteTask(id, req);
  }

  @Get('mytasks')
  @UseGuards(JwtAuthGuard)
  async getTasksUser(@Req() req) {
    return this.taskService.getTasksUser(req.id, req);
  }
}
