import { addHelloQuery } from "./hello";
import { addUserQuery } from "./user/query";
import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    addHelloQuery(t);
    addUserQuery(t);
  }
});
