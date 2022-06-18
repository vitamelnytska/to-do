import { Model, Types } from 'mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';
import { ITokenRepository } from '../../interfaces/itoken-repository';

export class TokenRepositoryMongo implements ITokenRepository {
  constructor(private _repository: Model<TokenDocument>) {}

  async getByUserId(userId: string): Promise<Token> {
    return this._repository
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();
  }

  removeByUserId(userId: string): Promise<Token> {
    return this._repository
      .findOneAndRemove({ userId: new Types.ObjectId(userId) })
      .exec();
  }

  create(token: string, userId: string): Promise<Token> {
    return this._repository
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { token, userId },
        { upsert: true },
      )
      .exec();
  }
}
