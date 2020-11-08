import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import { appConfig } from './config';
import { getContext } from './context';
import session from 'express-session';
import { v4 } from 'uuid';
import { initPassport, mongoConnection } from './utils';
import UserModel from './models/User';
import passport from 'passport';
import Prometheus from 'prom-client';
import compression from 'compression';

initPassport({ UserModel });

Prometheus.collectDefaultMetrics();

const app: express.Express = express();

app.disable('x-powered-by');

app.use(compression());

app.get('/metrics', (req: express.Request, res: express.Response) => {
  res.end(Prometheus.register.metrics());
});

app.use(
  session({
    genid: () => v4(),
    secret: appConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

const server: ApolloServer = new ApolloServer({
  schema,
  context: getContext,
  introspection: true,
  playground: {
    endpoint: '/api',
  },
  subscriptions: false,
});

app.use(express.json());

app.use(
  server.getMiddleware({
    path: '/',
    cors: {
      credentials: true,
      origin: [''],
    },
  })
);

mongoConnection
  .then(() => {
    app.listen({ port: appConfig.PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${appConfig.PORT}/graphql`
      );
    });
  })
  .catch((error: Error) => {
    console.log('Failed connection to mongo DB');

    console.error(error.message);
  });
