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
import { Task } from './schemas/tasks.schema';
import { tasksMock } from '../../server/task-mock';

let tasksData = tasksMock;

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //for tasks-mock
  @Get()
  async getAll(): Promise<CreateTaskDto[]> {
    return tasksData;
  }

  // @Get()
  // async getAll(): Promise<Task[]> {
  //   return this.tasksService.getAll();
  // }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @Header('Cache-Control', 'none')
  // create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  //   return this.tasksService.create(createTaskDto);
  // }

  //for tasks-mock
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createTask(@Body() createTask: CreateTaskDto): CreateTaskDto {
    const newTask: CreateTaskDto = {
      id: (tasksData.length + 1).toString(),
      ...createTask,
    };
    tasksData = [...tasksData, newTask];
    return newTask;
  }

  //for tasks-mock
  @Delete(':id')
  deleteTask(@Param('id') id): CreateTaskDto {
    const taskToDelete = tasksData.find((task) => task.id === id);
    tasksData = tasksData.filter((task) => task.id !== id);

    return taskToDelete;
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<Task> {
  //   return this.tasksService.remove(id);
  // }

  //for tasks-mock
  @Put(':id')
  updateTask(
    @Body() updateTask: CreateTaskDto,
    @Param('id') id,
  ): CreateTaskDto {
    tasksData = tasksData.map((task) => (task.id === id ? updateTask : task));

    return updateTask;
  }

  // @Put(':id')
  // update(
  //   @Body() updateTaskDto: UpdateTaskDto,
  //   @Param('id') id: string,
  // ): Promise<Task> {
  //   return this.tasksService.update(id, updateTaskDto);
  // }
}
