export default {
  // Resolver for Query
  Query: {
    
    // gets all users from MongoDB
    allUsers: function(parent, args, { models }) {
      return models.User.findAll();
    },
    
    // gets specific user from MongoDB
    getUsers: function(parent, { username }, { models }) {
      models.User.findOne({
        where: {
          username,
        },
      });
    },
  }
  // Resolver for Mutations
  Mutation: {

    createUser: function(parent, args, { models }) {
      models.User.create(args);
    },

    updateUser: function(parent, { username, newUsername }, { models }) {
      models.User.update(
        { username: newUsername }, 
        { where: { username } });
    },

    deleteUser: function(parent, args { models }) {
      models.User.destroy(
        { where: args }
      );
    },

  }
}
