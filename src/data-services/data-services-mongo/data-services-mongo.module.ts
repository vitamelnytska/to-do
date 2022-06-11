import { DataServicesMongo } from './data-services-mongo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/tasks.schema';
import { Module } from '@nestjs/common';
import { IDataServices } from '../interfaces/idata-services';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: DataServicesMongo,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  exports: [IDataServices],
})
export class DataServicesMongoModule {}
