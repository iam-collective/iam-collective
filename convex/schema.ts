import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//schema of all fields
export default defineSchema({
  stories: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});