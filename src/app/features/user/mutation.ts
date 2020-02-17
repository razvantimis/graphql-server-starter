import { ObjectDefinitionBlock, arg } from "nexus/dist/core";

export function addUserMutation(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("creatUser", {
    nullable: true,
    type: "User",
    args: {
      resource: arg({ type: "CreatUser" })
    },
    resolve: (_, { resource }) => {
      console.log(resource);
      return null;
    }
  });
}
