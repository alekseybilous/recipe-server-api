import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';
import { IUserModel, UserDocument } from '../models/User';

export interface IInitPassport {
  UserModel: IUserModel;
}

export const initPassport = ({ UserModel }: IInitPassport): void => {
  passport.use(
    new GraphQLLocalStrategy(async (email: unknown, password: unknown, done: any) => {
      const users: UserDocument[] = await UserModel.find();

      const matchingUser: UserDocument | undefined = users.find((user: UserDocument) => {
        return email === user.email && password === user.password;
      });

      const error = matchingUser ? null : new Error('no matching user');

      done(error, matchingUser);
    })
  );

  passport.serializeUser((user: UserDocument, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: UserDocument['_id'], done) => {
    const users: UserDocument[] = await UserModel.find();

    const matchingUser: UserDocument | undefined = users.find((user: UserDocument) => user._id === id);

    done(null, matchingUser);
  });
};
