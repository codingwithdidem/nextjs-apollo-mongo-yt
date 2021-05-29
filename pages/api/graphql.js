import { ApolloServer } from "apollo-server-micro";
import mongoose from "mongoose";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolver";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongodb Connected");
      })
      .catch((error) => {
        console.error(error.reason);
      });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
