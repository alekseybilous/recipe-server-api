import { IResolvers } from 'graphql-tools';
import { IGetContext } from '../context';
import { AuthenticateReturn } from 'graphql-passport/lib/types';
import { UserDocument } from '../models/User';

const resolvers: IResolvers = {
  Query: {
    currentUser: async (parent, args, context: IGetContext) =>
      await context.getUser(),
  },
  Mutation: {
    login: async (parent, { email, password }, context: IGetContext) => {
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
      { firstName, lastName, email, password, username },
      context: IGetContext
    ) => {
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
        username,
      }).save();

      await context.login(newUser);

      return { user: newUser };
    },
  },
};

export default resolvers;
