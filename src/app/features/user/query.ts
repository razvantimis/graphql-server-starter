import { getUserByFirebaseToken } from "./utils";
import { ObjectDefinitionBlock } from "nexus/dist/core";

export function addUserQuery<T extends ObjectDefinitionBlock<"Query">>(t: T) {
  t.field("UserInstanceByToken", {
    type: "User",
    nullable: true,
    resolve: async (parent, args, context) => {
      const user = await getUserByFirebaseToken(context);
      return user;
    }
  });
}
