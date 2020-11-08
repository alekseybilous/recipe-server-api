import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { buildContext } from 'graphql-passport';
import { Context } from 'graphql-passport/lib/buildContext';
import UserModel, { IUserModel, UserDocument } from './models/User';
import RecipeModel, { IRecipeModel } from './models/Recipe';

export interface IGetContext extends Context<UserDocument> {
  UserModel: IUserModel;
  RecipeModel: IRecipeModel;
}

export const getContext:
  | ContextFunction<ExpressContext, Context<UserDocument>>
  | Context<UserDocument> = ({ req, res }: ExpressContext): IGetContext => ({
  ...buildContext<UserDocument>({ req, res }),
  UserModel,
  RecipeModel,
});
