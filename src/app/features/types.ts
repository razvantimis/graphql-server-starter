import { scalarType } from "nexus";

export * from "./user/types";

export const Date = scalarType({
  name: "Date",
  asNexusMethod: "date",
  description: "Date",
  serialize: value => {
    return value;
  },
  parseValue: value => value,
  parseLiteral: (valueNode, ast) => (ast ? ast.value : null)
});
