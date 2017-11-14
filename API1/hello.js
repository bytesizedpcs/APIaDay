const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    goodbye: String
  }
`);

const root = {
  hello: () => 'Hello World!',
  goodbye: () => 'Goodbye'
};

graphql(schema, '{ goodbye }', root)
  .then(response => {
    console.log(response);
  });
