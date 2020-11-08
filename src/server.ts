import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from './schema';
import { appConfig } from './config';
import { getContext } from './context';
import session from 'express-session';
import { v4 } from 'uuid';
import { initPassport, mongoConnection } from './utils';
import UserModel from './models/User';
import passport from 'passport';

initPassport({ UserModel });

const app: express.Express = express();

app.use(
  session({
    genid: () => v4(),
    secret: appConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

const server: ApolloServer = new ApolloServer({
  schema,
  playground: true,
  context: getContext,
});

app.use(
  '*',
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());

server.applyMiddleware({ app, path: '/graphql', cors: false });

mongoConnection
  .then(() => {
    app.listen({ port: appConfig.PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${appConfig.PORT}/graphql`);
    });
  })
  .catch((error: Error) => {
    console.log('Failed connection to mongo DB');

    console.error(error.message);
  });
