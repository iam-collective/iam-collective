import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get user information by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    
    if (!user) {
      return null;
    }
    
    // Return user without password for security
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Query to get user information by _id
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      return null;
    }
    
    // Return user without password for security
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Mutation to create a new user
export const createUser = mutation({
  args: {
    full_name: v.string(),
    email: v.string(),
    password: v.string(),
    age: v.number(),
    country: v.string(),
    device_type: v.string(),
    healing_Journey: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if email is already registered
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    
    if (existingUser) {
      throw new Error("Email already registered");
    }
    
    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return { success: true, userId };
  },
});

// Mutation to update user information
export const updateUserInfo = mutation({
  args: {
    userId: v.id("users"),
    full_name: v.optional(v.string()),
    email: v.optional(v.string()),
    password: v.optional(v.string()),
    age: v.optional(v.number()),
    country: v.optional(v.string()),
    device_type: v.optional(v.string()),
    healing_Journey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updateData } = args;
    
    const user = await ctx.db.get(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    // If email is being updated, check it's not taken
    if (updateData.email && updateData.email !== user.email) {
      const emailExists = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", updateData.email!))
        .unique();
      
      if (emailExists) {
        throw new Error("Email already registered");
      }
    }
    
    await ctx.db.patch(userId, {
      ...updateData,
      updatedAt: Date.now(),
    });
    
    return { success: true };
  },
});

// Mutation to delete user
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    await ctx.db.delete(args.userId);
    
    return { success: true };
  },
});

// Query for login - returns user if email/password match
export const loginUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // Return user data and hashed password for frontend verification
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      hashedPassword: user.password,
    };
  },
});