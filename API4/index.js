import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';

// use graphql's tool to make a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// create express app
const app = express();

app.use(cors('*'));

app.use(
  'graphiql',
  graphiqlExpress({
    enpointURL: '/graphql',
  }),
);

app.use(
  'graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { models } }),
);

models.sequelize.sync().then(() => app.listen(3000));
