import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { buildContext, PassportContext } from 'graphql-passport';
import { Context } from 'graphql-passport/lib/buildContext';
import UserModel, { IUserModel, UserDocument } from './models/User';

export interface IGetContext extends Context<UserDocument> {
  UserModel: IUserModel;
}

export const getContext:
  | ContextFunction<ExpressContext, Context<UserDocument>>
  | Context<UserDocument> = ({ req, res }: ExpressContext): IGetContext => ({
  ...buildContext<UserDocument>({ req, res }),
  UserModel,
});
