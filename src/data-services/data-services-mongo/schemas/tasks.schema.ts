import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  ownerId: string;

  @Prop({
    required: true,
  })
  priority: number;

  @Prop({
    required: true,
  })
  duration: number;

  @Prop()
  status?: string;

  @Prop({
    required: true,
  })
  creationDate: Date;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
