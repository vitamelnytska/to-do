import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/сreate-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tasksService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
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
