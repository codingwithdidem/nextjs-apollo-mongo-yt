import { User } from "../models/User.js";

export const resolvers = {
  Query: {
    users: () => {
      return User.find({});
    },
    user: (_, { id }) => {
      return User.findOne({
        _id: id,
      });
    },
  },
  Mutation: {
    createUser: async (parent, { name, age }, ctx, info) => {
      const user = new User({
        name,
        age,
      });

      return await user.save();
    },
  },
};
