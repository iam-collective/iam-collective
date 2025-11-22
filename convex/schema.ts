import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//schema of all fields
export default defineSchema({
  users: defineTable({
    full_name: v.string(),
    email: v.string(),
    password: v.string(),
    age: v.number(),
    country: v.string(),
    device_type: v.string(),
    healing_Journey: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  stories: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    isPublic: v.optional(v.boolean()),
    username: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
});