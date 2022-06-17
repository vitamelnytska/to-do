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
  Query,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PaginationPipe } from '../../pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from '../../pipes/object-id/objectid-validation.pipe';
import { BaseTaskDto } from './dto';
import { PaginationDto } from '../../pipes/pagination/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

const mockUserId = '62911964a7afaf9b1059a2ff'; // get id from auth

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  async getAll(@Query() pagination: PaginationDto) {
    return this.tasksService.getAll(pagination, mockUserId);
  }

  @Get(':id')
  getOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.tasksService.getById(id, mockUserId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async createTask(@Body() createdTaskDto: BaseTaskDto) {
    await this.tasksService.create(createdTaskDto, mockUserId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    this.tasksService.remove(id, mockUserId);
  }

  @Put(':id')
  update(
    @Body() updateTaskDto: BaseTaskDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return this.tasksService.update(id, updateTaskDto, mockUserId);
  }
}
