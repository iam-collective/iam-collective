import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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

  // Sessions table to store JWT tokens
  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
    isActive: v.boolean(),
    deviceInfo: v.optional(v.string()),
    lastAccessedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_token", ["token"])
    .index("by_isActive", ["isActive"]),

  stories: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
