export default `

  type Query {
    allUsers: [User!]!
    getUser(username: String!): User
  }

  type Mutation {
    creatUser(username: String!): User
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(username: String!): Int!
  }

`;
