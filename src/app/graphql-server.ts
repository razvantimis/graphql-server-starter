import { ApolloServer } from "apollo-server-koa";
import { makeSchema } from "nexus";
import * as Types from "./features";
import { getBaseApolloConfig } from "./utils";

export async function getGraphqlServer() {
  const schema = makeSchema({
    types: [Types],
    outputs: {
      schema: __dirname + "/generated/schema.graphql",
      typegen: __dirname + "/generated/typings.ts"
    }
  });

  return new ApolloServer({
    ...getBaseApolloConfig(),
    schema,

    context: ({ ctx }: any) => {
      return { user: ctx.state.user };
    }
  });
}
