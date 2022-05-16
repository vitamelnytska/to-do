import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/сreate-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  @Get()
  getAll() {
    return 'getAll';
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return 'getOne' + id;
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): string {
    return `Title: ${createTaskDto.title} priority: ${createTaskDto.priority} duration: ${createTaskDto.duration}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remove' + id;
  }

  @Put(':id')
  update(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return 'Update ' + id;
  }
}
