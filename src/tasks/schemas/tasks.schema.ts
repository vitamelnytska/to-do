import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;
  @Prop()
  priority: number;
  @Prop()
  duration: number;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
