import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// List all feedback
export const listFeedback = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("professional_feedback").collect();
  },
});

// Copy all stories to professional_feedback safely
export const copyAllStoriesToFeedback = mutation({
  args: {},
  handler: async (ctx) => {
    const stories = await ctx.db.query("stories").collect();
    const allFeedback = await ctx.db.query("professional_feedback").collect();

    let copiedCount = 0;

    for (const story of stories) {
      const exists = allFeedback.find((f) => f.storyId === story._id);

      if (!exists) {
        await ctx.db.insert("professional_feedback", {
          storyId: story._id,
          title: story.title,
          content: story.content,
          feedback: "",
          createdAt: Date.now(),
        });
        copiedCount++;
      }
    }

    return { success: true, totalStories: stories.length, copiedCount };
  },
});

// // Clear all professional_feedback entries - Not needed, FOR TESTING!!!!
// export const clearAllFeedback = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const allFeedback = await ctx.db.query("professional_feedback").collect();

//     for (const feedback of allFeedback) {
//       await ctx.db.delete(feedback._id);
//     }

//     return { success: true, deletedCount: allFeedback.length };
//   },
// });

// Internal mutation to update feedback (called by action)
export const updateFeedbackInternal = mutation({
  args: {
    storyId: v.string(),
    feedback: v.string(),
  },
  handler: async (ctx, args) => {
    const allFeedback = await ctx.db.query("professional_feedback").collect();
    const feedbackEntry = allFeedback.find(
      (f) => f.storyId && f.storyId.toString() === args.storyId
    );

    if (!feedbackEntry) {
      throw new Error(`Feedback entry not found for storyId: ${args.storyId}`);
    }

    // Check if feedback was previously empty
    const wasEmpty = !feedbackEntry.feedback || feedbackEntry.feedback.trim() === "";

    // Update the feedback field
    await ctx.db.patch(feedbackEntry._id, {
      feedback: args.feedback,
    });

    return { 
      success: true, 
      storyId: args.storyId,
      wasEmpty,
      title: feedbackEntry.title,
    };
  },
});

// Action to update feedback and send email - TODO with a proper email server, this is experimental
// export const updateFeedbackFromCSV = action({
//   args: {
//     storyId: v.string(),
//     feedback: v.string(),
//   },
//   handler: async (ctx, args) => {
//     // Update the database first
//     const updateResult = await ctx.runMutation(api.feedback.updateFeedbackInternal, {
//       storyId: args.storyId,
//       feedback: args.feedback,
//     });

//     // Send email if feedback was previously empty and is now filled
//     const isNowFilled = args.feedback && args.feedback.trim() !== "";
    
//     if (updateResult.wasEmpty && isNowFilled) {
//       try {
//         const apiKey = process.env.RESEND_API_KEY;
        
//         const response = await fetch("https://api.resend.com/emails", {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             from: "onboarding@resend.dev",
//             to: ["celinetsiko@gmail.com"], // CHANGE THIS to your real email
//             subject: `New Feedback Received: ${updateResult.title}`,
//             html: `
//               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                 <h2 style="color: #333;">New Feedback Received</h2>
//                 <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
//                   <p><strong>Story Title:</strong> ${updateResult.title}</p>
//                   <p><strong>Story ID:</strong> ${args.storyId}</p>
//                 </div>
//                 <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
//                   <h3 style="color: #666; margin-top: 0;">Feedback:</h3>
//                   <p style="line-height: 1.6;">${args.feedback}</p>
//                 </div>
//                 <p style="color: #999; font-size: 12px; margin-top: 20px;">
//                   This email was sent automatically when feedback was added.
//                 </p>
//               </div>
//             `,
//           }),
//         });

//         const result = await response.json();
        
//         if (!response.ok) {
//           console.error("Resend API error:", result);
//         } else {
//           console.log("Email sent successfully:", result);
//         }
//       } catch (emailError) {
//         console.error("Failed to send email:", emailError);
//       }
//     }

//     return { success: true, storyId: args.storyId };
//   },
// });