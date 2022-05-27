export class CreateTaskDto {
  id?: string;
  readonly name: string;
  readonly priority: number; // priority from 1 to 3
  readonly duration: number; // duration in hours
}
