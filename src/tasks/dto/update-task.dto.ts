export class UpdateTaskDto {
  id?: string;
  readonly name: string;
  readonly priority: number;
  readonly duration: number;
}
