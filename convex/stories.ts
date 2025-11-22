import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//upload URL for images, auth removed for now
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Not authenticated");

    return await ctx.storage.generateUploadUrl();
  },
});

// Upload a story
export const uploadStory = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")),
    isPublic: v.optional(v.boolean()),
    username: v.optional(v.string()),
  },
  handler: async (ctx, { title, content, imageId, isPublic, username }) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("stories", {
      userId: "anonymous", // identity.subject when auth is enabled, anonymous for now
      title,
      content,
      imageId,
      createdAt: Date.now(),
      isPublic,
      username,
    });
  },
});

// List all stories (hides username if isPublic is false)
export const listStories = query({
  args: {},
  handler: async (ctx) => {
    const stories = await ctx.db.query("stories").order("desc").collect();

    return await Promise.all(
      stories.map(async (story) => ({
        ...story,
        // Hide username if user chose to be anonymous
        username: story.isPublic ? story.username : "Anonymous",
        imageUrl: story.imageId ? await ctx.storage.getUrl(story.imageId) : null,
      }))
    );
  },
});

// List stories by username (only their own stories show real username)
export const listStoriesByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const stories = await ctx.db.query("stories").order("desc").collect();

    const userStories = stories.filter((story) => story.username === username);

    return await Promise.all(
      userStories.map(async (story) => ({
        ...story,
        imageUrl: story.imageId ? await ctx.storage.getUrl(story.imageId) : null,
      }))
    );
  },
});

// Get a single story by ID
export const getStory = query({
  args: { storyId: v.id("stories") },
  handler: async (ctx, { storyId }) => {
    const story = await ctx.db.get(storyId);
    if (!story) return null;

    return {
      ...story,
      // Hide username if user chose to be anonymous
      username: story.isPublic ? story.username : "Anonymous",
      imageUrl: story.imageId ? await ctx.storage.getUrl(story.imageId) : null,
    };
  },
});

// Delete a story
export const deleteStory = mutation({
  args: { storyId: v.id("stories") },
  handler: async (ctx, { storyId }) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Not authenticated");

    const story = await ctx.db.get(storyId);
    if (!story) throw new Error("Story not found");

    // Uncomment when auth is enabled:
    // if (story.userId !== identity.subject) throw new Error("Not authorized");

    if (story.imageId) {
      await ctx.storage.delete(story.imageId);
    }

    await ctx.db.delete(storyId);
  },
});

// Update a story
export const updateStory = mutation({
  args: {
    storyId: v.id("stories"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, { storyId, title, content, imageId, isPublic }) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Not authenticated");

    const story = await ctx.db.get(storyId);
    if (!story) throw new Error("Story not found");

    // Uncomment when auth is enabled:
    // if (story.userId !== identity.subject) throw new Error("Not authorized");

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (isPublic !== undefined) updates.isPublic = isPublic;
    if (imageId !== undefined) {
      if (story.imageId && story.imageId !== imageId) {
        await ctx.storage.delete(story.imageId);
      }
      updates.imageId = imageId;
    }

    await ctx.db.patch(storyId, updates);
  },
});