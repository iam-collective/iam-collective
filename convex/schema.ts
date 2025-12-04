import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

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
  }).index('by_email', ['email']),

  stories: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.union(v.id('_storage'), v.string())),
    createdAt: v.number(),
    isPublic: v.optional(v.boolean()),
    username: v.optional(v.string()),
  }).index('by_userId', ['userId']),

  professional_feedback: defineTable({
    storyId: v.id('stories'),       // relationship to story
    title: v.string(),              
    content: v.string(), 
    email: v.string(),           
    feedback: v.string(),           // will be empty (Professional must fill it in)
    createdAt: v.number(),          
  })
    .index('by_storyId', ['storyId'])  // Add this for faster lookups
    .index('by_email', ['email']),     // Add this if you want to query by email
});