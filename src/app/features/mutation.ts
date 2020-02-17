import { addUserMutation } from "./user/mutation";
import { mutationType } from "nexus";

export const Mutation = mutationType({
  definition(t) {
    addUserMutation(t);
  }
});
