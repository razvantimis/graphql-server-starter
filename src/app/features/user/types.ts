import { objectType, enumType, inputObjectType } from "nexus/dist";
export const UserRole = enumType({
  name: "UserRole",
  members: ["Admin"]
});
export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("firebaseUid");
    t.string("fullName");
    t.string("email");
    t.date("createdAt");
    t.field("role", { type: "UserRole" });
    t.boolean("isEnabled", { nullable: true });
  }
});

export const CreatUser = inputObjectType({
  name: "CreatUser",
  definition(t) {
    t.string("fullName");
    t.string("email");
    t.string("password");
    t.field("role", { type: "UserRole" });
  }
});
