import { IResolvers } from 'graphql-tools';
import { IGetContext } from '../context';
import { AuthenticateReturn } from 'graphql-passport/lib/types';
import { UserDocument } from '../models/User';
import {
  LoginInput,
  MutationAddRecipeArgs,
  MutationDeleteUserRecipeArgs,
  MutationLikeRecipeArgs,
  MutationLoginArgs,
  MutationSignupArgs,
  MutationUnlikeRecipeArgs,
  MutationUpdateUserRecipeArgs,
  QueryRecipeArgs,
  QueryUserRecipesArgs,
  SiginupInput,
  UpdateUserRecipeInput,
} from '../generated/graphql';
import { RecipeDocument } from '../models/Recipe';

const resolvers: IResolvers = {
  Query: {
    user: async (parent, args, context: IGetContext): Promise<UserDocument> =>
      await context.getUser(),
    recipe: async (
      parent,
      args: QueryRecipeArgs,
      context: IGetContext
    ): Promise<RecipeDocument | null> =>
      await context.RecipeModel.findById(args.input._id),
    recipes: async (
      parent,
      args,
      context: IGetContext
    ): Promise<RecipeDocument[]> => await context.RecipeModel.find(),
    userRecipes: async (
      parent,
      args: QueryUserRecipesArgs,
      context: IGetContext
    ): Promise<RecipeDocument[]> =>
      await context.RecipeModel.find({ email: args.input.email }).sort({
        createdDate: 'desc',
      }),
  },
  Mutation: {
    login: async (
      parent,
      args: MutationLoginArgs,
      context: IGetContext
    ): Promise<{ user?: UserDocument }> => {
      const { email, password }: LoginInput = args.input;
      const {
        user,
      }: AuthenticateReturn<UserDocument> = await context.authenticate(
        'graphql-local',
        {
          email,
          password,
        }
      );

      await context.login(user as UserDocument);

      return { user };
    },
    signup: async (
      parent,
      args: MutationSignupArgs,
      context: IGetContext
    ): Promise<{ user: UserDocument }> => {
      const { firstName, lastName, email, password }: SiginupInput = args.input;

      const existingUsers: UserDocument[] = await context.UserModel.find();

      const userWithEmailAlreadyExists: boolean = !!existingUsers.find(
        (user: UserDocument) => user.email === email
      );

      if (userWithEmailAlreadyExists) {
        throw new Error('User with email already exists');
      }

      const newUser = await new context.UserModel({
        firstName,
        lastName,
        email,
        password,
      }).save();

      await context.login(newUser);

      return { user: newUser };
    },
    addRecipe: async (
      parent,
      args: MutationAddRecipeArgs,
      context: IGetContext
    ): Promise<RecipeDocument> => new context.RecipeModel(args.input).save(),
    deleteUserRecipe: async (
      parent,
      args: MutationDeleteUserRecipeArgs,
      context: IGetContext
    ): Promise<RecipeDocument | null> =>
      await context.RecipeModel.findOneAndRemove({ _id: args.input._id }),
    likeRecipe: async (
      parent,
      args: MutationLikeRecipeArgs,
      context: IGetContext
    ): Promise<RecipeDocument | null> => {
      const recipe: RecipeDocument | null = await context.RecipeModel.findOneAndUpdate(
        { _id: args.input._id },
        { $inc: { likes: 1 } }
      );

      await context.UserModel.findOneAndUpdate(
        { email: args.input.email },
        { $addToSet: { favorites: args.input._id } }
      );

      return recipe;
    },
    unlikeRecipe: async (
      parent,
      args: MutationUnlikeRecipeArgs,
      context: IGetContext
    ): Promise<RecipeDocument | null> => {
      const recipe: RecipeDocument | null = await context.RecipeModel.findOneAndUpdate(
        { _id: args.input._id },
        { $inc: { likes: -1 } }
      );

      await context.UserModel.findOneAndUpdate(
        { email: args.input.email },
        // @ts-ignore
        { $pull: { favorites: args.input._id } }
      );

      return recipe;
    },
    updateUserRecipe: async (
      parent,
      args: MutationUpdateUserRecipeArgs,
      context: IGetContext
    ): Promise<RecipeDocument | null> => {
      const { _id, ...values }: UpdateUserRecipeInput = args.input;

      return await context.RecipeModel.findOneAndUpdate(
        { _id },
        { $set: { ...values, email: values.email || undefined } },
        { new: true }
      );
    },
  },
};

export default resolvers;
