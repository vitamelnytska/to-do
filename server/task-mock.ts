import { CreateTaskDto } from '../src/tasks/dto/сreate-task.dto';
export const tasksMock: CreateTaskDto[] = [
  {
    id: '1',
    name: 'first',
    priority: 1,
    duration: 4,
  },
  {
    id: '2',
    name: 'second',
    priority: 3,
    duration: 2,
  },
  {
    id: '3',
    name: 'third',
    priority: 1,
    duration: 1,
  },
  {
    id: '4',
    name: 'fourth',
    priority: 2,
    duration: 3,
  },
];
