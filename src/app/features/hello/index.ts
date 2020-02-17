import { stringArg } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/core";

export function addHelloQuery(t: ObjectDefinitionBlock<"Query">) {
  t.string("hello", {
    args: { name: stringArg({ nullable: true }) },
    resolve: (parent, { name }) => `Hello ${name || "World"}!`
  });
}
