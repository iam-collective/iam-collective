import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// for JWT generation since it requires crypto
import { action } from "./_generated/server";

// Helper function to generate JWT and store in database
export const generateAuthToken = action({
  args: {
    userId: v.id("users"),
    email: v.string(),
    fullName: v.string(),
    deviceInfo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const jwt = require('jsonwebtoken');
    
    const secret = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    
    const payload = {
      userId: args.userId,
      email: args.email,
      fullName: args.fullName,
    };
    
    const token = jwt.sign(payload, secret, { expiresIn });
    
    // Calculate expiration timestamp (7 days = 604800000 ms)
    const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000);
    
    // Store token in database
    await ctx.runMutation(api.auth.storeSession, {
      userId: args.userId,
      token,
      expiresAt,
      deviceInfo: args.deviceInfo,
    });
    
    return { token };
  },
});

// Store session in database
export const storeSession = mutation({
  args: {
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    deviceInfo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", {
      userId: args.userId,
      token: args.token,
      createdAt: Date.now(),
      expiresAt: args.expiresAt,
      isActive: true,
      deviceInfo: args.deviceInfo,
      lastAccessedAt: Date.now(),
    });
    
    return { sessionId };
  },
});

// Verify JWT token and check if it exists in database
export const verifyAuthToken = action({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const jwt = require('jsonwebtoken');
      const secret = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
      
      // Verify JWT signature and expiration
      const decoded = jwt.verify(args.token, secret);
      
      // Check if session exists and is active in database
      const session = await ctx.runQuery(api.auth.getSessionByToken, {
        token: args.token,
      });
      
      if (!session || !session.isActive) {
        return { 
          valid: false, 
          error: 'Session not found or inactive' 
        };
      }
      
      // Check if session is expired
      if (session.expiresAt < Date.now()) {
        // Mark session as inactive
        await ctx.runMutation(api.auth.deactivateSession, {
          token: args.token,
        });
        
        return { 
          valid: false, 
          error: 'Session expired' 
        };
      }
      
      // Update last accessed time
      await ctx.runMutation(api.auth.updateSessionAccess, {
        token: args.token,
      });
      
      return { 
        valid: true, 
        payload: decoded,
        session 
      };
    } catch (error: any) {
      return { 
        valid: false, 
        error: error.message 
      };
    }
  },
});

// Get session by token
export const getSessionByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    
    return session;
  },
});

// Deactivate session (logout or expiration)
export const deactivateSession = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    
    if (session) {
      await ctx.db.patch(session._id, {
        isActive: false,
      });
    }
    
    return { success: true };
  },
});

// Update session last accessed time
export const updateSessionAccess = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    
    if (session) {
      await ctx.db.patch(session._id, {
        lastAccessedAt: Date.now(),
      });
    }
    
    return { success: true };
  },
});

// Get all active sessions for a user
export const getUserSessions = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    
    return sessions;
  },
});

// Logout from specific session
export const logoutSession = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return await ctx.runMutation(api.auth.deactivateSession, {
      token: args.token,
    });
  },
});

// Logout from all sessions (logout everywhere)
export const logoutAllSessions = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    
    for (const session of sessions) {
      await ctx.db.patch(session._id, {
        isActive: false,
      });
    }
    
    return { success: true, deactivated: sessions.length };
  },
});