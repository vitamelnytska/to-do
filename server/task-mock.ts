import { CreateTaskDto } from '../src/tasks/dto/сreate-task.dto';
export const tasksMock: CreateTaskDto[] = [
  {
    id: '1',
    name: 'first',
    duration: 1,
    priority: 4,
  },
  {
    id: '2',
    name: 'second',
    duration: 3,
    priority: 2,
  },
  {
    id: '3',
    name: 'third',
    duration: 1,
    priority: 1,
  },
  {
    id: '4',
    name: 'fourth',
    duration: 2,
    priority: 3,
  },
];
