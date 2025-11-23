import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import * as S from './StorieSection.styles'
export default function StoryPage() {
    const { storyId } = useParams();
    const navigate = useNavigate()
    const story = useQuery(
        api.stories.getStory,
        storyId ? { storyId } : "skip"
    );

    if (story === undefined) return <p>Loading…</p>;
    if (story === null) return <p>Story not found</p>;

    const readableDate = new Date(story.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <S.StoryScreen>
            <S.BackButton onClick={() => navigate(-1)}>
                ← Back
            </S.BackButton>

            <S.StoryHeader>
                <S.StoryTitle>{story.title}</S.StoryTitle>

                {/* Optional subtitle — you can remove this if not needed */}
                <S.StorySubtitle>
                    {"A story from the community"}
                </S.StorySubtitle>

                <S.StoryMeta>
                    <span>By {story.username ?? "Anonymous"}</span>
                    <span>{readableDate}</span>
                </S.StoryMeta>
            </S.StoryHeader>

            <S.HeroImage
                src={
                    story.imageUrl ??
                    "https://placehold.co/1200x600/ff69b4/ffffff?text=No+Image"
                }
            />

            <S.StoryContent>
                <p>{story.content}</p>
            </S.StoryContent>

            <S.StoryFooter />
        </S.StoryScreen>
    );
}

// =======
// import React, { useState } from "react";
// import {
//   PinkButton,
//   ScreenContainer,
//   StyledContainer,
//   StyledPopUpCard,
//   StyledScroller,
//   SuggestedTitle,
// } from "./Stories.style";
// import Header from "../header/Header";
// import { useScrollHandler } from "../../hooks/use-scroll-handler";
// import BottomNavigation from "../bottom-nav/BottomNav";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router";
// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface StoryProps {
//   _id: Id<"stories">;
//   title: string;
//   content: string;
//   imageId?: Id<"_storage">;
//   imageUrl: string | null;
//   createdAt: number;
//   userId: string;
// }

// const Stories: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const { isGuest, isAuthenticated } = useAuth();
//   const [showGuestModal, setShowGuestModal] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);

//   const { handleScroll } = useScrollHandler(setIsScrolling);

//   // Convex hooks - use api object for proper typing
//   const stories = useQuery(api.stories.listStories);
//   const uploadStory = useMutation(api.stories.uploadStory);
//   const generateUploadUrl = useMutation(api.stories.generateUploadUrl);
//   const deleteStory = useMutation(api.stories.deleteStory);
//   console.log(stories)

//   //this is the payload example
//   // {
//   //   "_id": "k97abc123def456",
//   //   "_creationTime": 1732456789123,
//   //   "userId": "this is going to come from auth",
//   //   "title": "My First Story",
//   //   "content": "This is my story about...",
//   //   "createdAt": 1732456789000,
//   //   "isPublic": true,
//   //   "username": "JohnDoe",
//   //   "imageUrl": "https://your-project.convex.cloud/api/storage/kg789xyz456abc"
//   // }

//   const handleDelete = async (storyId: Id<"stories">) => {
//     try {
//       await deleteStory({ storyId });
//     } catch (error) {
//       console.error("Failed to delete story:", error);
//       alert("Failed to delete story. You may not have permission.");
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImageFile(file);
//   };

//   const handlePost = async () => {
//     if (!title || !description) return alert("Please fill everything!");

//     setIsLoading(true);

//     try {
//       let imageId: Id<"_storage"> | undefined;

//       if (imageFile) {
//         // Step 1: Get upload URL from Convex
//         const uploadUrl = await generateUploadUrl();

//         // Step 2: Upload file directly to Convex storage
//         const result = await fetch(uploadUrl, {
//           method: "POST",
//           headers: { "Content-Type": imageFile.type },
//           body: imageFile,
//         });

//         if (!result.ok) {
//           throw new Error("Failed to upload image");
//         }

//         const { storageId } = await result.json();
//         imageId = storageId;
//       }

//       // Step 3: Create the story with the image reference
//       await uploadStory({
//         title,
//         content: description,
//         imageId,
//       });

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setImageFile(null);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Failed to post story:", error);
//       alert("Failed to post story. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddStoryClick = () => {
//     if (isGuest && !isAuthenticated) {
//       setShowGuestModal(true);
//     } else {
//       setShowModal(true);
//     }
//   };

//   // Loading state
//   if (stories === undefined) {
//     return (
//       <ScreenContainer>
//         <Header title="Stories" />
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
//           <p>Loading stories...</p>
//         </div>
//         <BottomNavigation />
//       </ScreenContainer>
//     );
//   }

//   return (
//     <ScreenContainer>
//       <Header title="Stories" />
//       <StyledScroller onScroll={handleScroll}>
//         {stories.length === 0 ? (
//           <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: "24px" }}>
//             <StyledContainer style={{ background: "linear-gradient(180deg, #FAF0E6 0%, #FDEDF4 100%)", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
//               <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "purple", marginBottom: "0.5rem", fontFamily: "Lora" }}>Share your story</h1>
//               <p style={{ fontSize: "1.5rem", maxWidth: "320px", color: "#6b6b6b", marginBottom: "2rem" }}>
//                 Your words can inspire someone. Tell us about a moment, a feeling, or something you learned.
//               </p>
//               <PinkButton onClick={handleAddStoryClick}>
//                 Add a Story
//               </PinkButton>

//               {showGuestModal && (
//                 <>
//                   <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={() => setShowGuestModal(false)} />
//                   <StyledPopUpCard>
//                     <h3 style={{ fontFamily: "Work Sans" }}>Sign Up to Share Stories</h3>
//                     <p>Your words can inspire others. Create an account to unlock full access.</p>
//                     <PinkButton onClick={() => { setShowGuestModal(false); navigate("/signup"); }}>Sign Up</PinkButton>
//                     <PinkButton onClick={() => setShowGuestModal(false)} style={{ backgroundColor: "#ffd7e8", marginLeft: "1rem" }}>Cancel</PinkButton>
//                   </StyledPopUpCard>
//                 </>
//               )}
//             </StyledContainer>
//           </div>
//         ) : (
//           <>
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "16px" }}>
//               <button onClick={handleAddStoryClick} style={{ width: 50, height: 50, borderRadius: "50%", fontSize: 28, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffbfdc", color: "white" }}>+</button>
//             </div>
//             <SuggestedTitle>Recent Stories</SuggestedTitle>
//           </>
//         )}

//         {/* Create Story Modal */}
//         {showModal && (
//           <>
//             <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={() => setShowModal(false)} />
//             <StyledPopUpCard>
//               <h3 style={{ fontFamily: "Work Sans" }}>Create a Story</h3>
//               <input 
//                 type="text" 
//                 placeholder="Title" 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ddd", borderRadius: 4, outline: "none" }} 
//               />
//               <textarea 
//                 placeholder="Description" 
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//                 style={{ width: "100%", height: 80, marginBottom: 8, padding: 8, border: "1px solid #ddd", borderRadius: 4, outline: "none", resize: "vertical" }} 
//               />
//               <input type="file" accept="image/*" onChange={handleImageUpload} />
//               {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: "100%", marginTop: 10, borderRadius: 8 }} />}
//               <button 
//                 onClick={handlePost} 
//                 disabled={isLoading}
//                 style={{ 
//                   marginTop: 10, 
//                   padding: "8px 16px", 
//                   cursor: isLoading ? "not-allowed" : "pointer", 
//                   width: "100%", 
//                   border: "none", 
//                   outline: "none", 
//                   borderRadius: "8px", 
//                   backgroundColor: isLoading ? "#ccc" : "#ffbfdc" 
//                 }}
//               >
//                 {isLoading ? "Posting..." : "Post"}
//               </button>
//             </StyledPopUpCard>
//           </>
//         )}

//         {/* Stories List */}
//         {stories.map((story) => (
//           <div 
//             key={story._id} 
//             style={{ 
//               border: "1px solid #ff69b4", 
//               borderRadius: 16, 
//               padding: 12, 
//               marginBottom: 16, 
//               textAlign: "left", 
//               backgroundColor: "white", 
//               boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)" 
//             }}
//           >
//             <p style={{ fontSize: 12, color: "#888" }}>
//               {new Date(story.createdAt).toLocaleString()}
//             </p>
//             <h3>{story.title}</h3>
//             {story.imageUrl && (
//               <img 
//                 src={story.imageUrl} 
//                 alt={story.title} 
//                 style={{ width: "100%", borderRadius: 10, marginBottom: 8 }} 
//               />
//             )}
//             <p>{story.content}</p>
//             <button 
//               onClick={() => handleDelete(story._id)} 
//               style={{ 
//                 background: "transparent", 
//                 border: "none", 
//                 fontSize: 18, 
//                 cursor: "pointer", 
//                 color: "#ff4d6d" 
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </StyledScroller>
//       <BottomNavigation />
//     </ScreenContainer>
//   );
// };

// export default Stories;
// >>>>>>> 7b9e4708a57e6326ef90454cc4259bee44318c62
// =======
// import React, { useState } from "react";
// import {
//   PinkButton,
//   ScreenContainer,
//   StyledContainer,
//   StyledPopUpCard,
//   StyledScroller,
//   SuggestedTitle,
// } from "./Stories.style";
// import Header from "../header/Header";
// import { useScrollHandler } from "../../hooks/use-scroll-handler";
// import BottomNavigation from "../bottom-nav/BottomNav";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router";
// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface StoryProps {
//   _id: Id<"stories">;
//   title: string;
//   content: string;
//   imageId?: Id<"_storage">;
//   imageUrl: string | null;
//   createdAt: number;
//   userId: string;
// }

// const Stories: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const { isGuest, isAuthenticated } = useAuth();
//   const [showGuestModal, setShowGuestModal] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);

//   const { handleScroll } = useScrollHandler(setIsScrolling);

//   // Convex hooks - use api object for proper typing
//   const stories = useQuery(api.stories.listStories);
//   const uploadStory = useMutation(api.stories.uploadStory);
//   const generateUploadUrl = useMutation(api.stories.generateUploadUrl);
//   const deleteStory = useMutation(api.stories.deleteStory);
//   console.log(stories)

//   //this is the payload example
//   // {
//   //   "_id": "k97abc123def456",
//   //   "_creationTime": 1732456789123,
//   //   "userId": "this is going to come from auth",
//   //   "title": "My First Story",
//   //   "content": "This is my story about...",
//   //   "createdAt": 1732456789000,
//   //   "isPublic": true,
//   //   "username": "JohnDoe",
//   //   "imageUrl": "https://your-project.convex.cloud/api/storage/kg789xyz456abc"
//   // }

//   const handleDelete = async (storyId: Id<"stories">) => {
//     try {
//       await deleteStory({ storyId });
//     } catch (error) {
//       console.error("Failed to delete story:", error);
//       alert("Failed to delete story. You may not have permission.");
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImageFile(file);
//   };

//   const handlePost = async () => {
//     if (!title || !description) return alert("Please fill everything!");

//     setIsLoading(true);

//     try {
//       let imageId: Id<"_storage"> | undefined;

//       if (imageFile) {
//         // Step 1: Get upload URL from Convex
//         const uploadUrl = await generateUploadUrl();

//         // Step 2: Upload file directly to Convex storage
//         const result = await fetch(uploadUrl, {
//           method: "POST",
//           headers: { "Content-Type": imageFile.type },
//           body: imageFile,
//         });

//         if (!result.ok) {
//           throw new Error("Failed to upload image");
//         }

//         const { storageId } = await result.json();
//         imageId = storageId;
//       }

//       // Step 3: Create the story with the image reference
//       await uploadStory({
//         title,
//         content: description,
//         imageId,
//       });

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setImageFile(null);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Failed to post story:", error);
//       alert("Failed to post story. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddStoryClick = () => {
//     if (isGuest && !isAuthenticated) {
//       setShowGuestModal(true);
//     } else {
//       setShowModal(true);
//     }
//   };

//   // Loading state
//   if (stories === undefined) {
//     return (
//       <ScreenContainer>
//         <Header title="Stories" />
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
//           <p>Loading stories...</p>
//         </div>
//         <BottomNavigation />
//       </ScreenContainer>
//     );
//   }

//   return (
//     <ScreenContainer>
//       <Header title="Stories" />
//       <StyledScroller onScroll={handleScroll}>
//         {stories.length === 0 ? (
//           <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: "24px" }}>
//             <StyledContainer style={{ background: "linear-gradient(180deg, #FAF0E6 0%, #FDEDF4 100%)", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
//               <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "purple", marginBottom: "0.5rem", fontFamily: "Lora" }}>Share your story</h1>
//               <p style={{ fontSize: "1.5rem", maxWidth: "320px", color: "#6b6b6b", marginBottom: "2rem" }}>
//                 Your words can inspire someone. Tell us about a moment, a feeling, or something you learned.
//               </p>
//               <PinkButton onClick={handleAddStoryClick}>
//                 Add a Story
//               </PinkButton>

//               {showGuestModal && (
//                 <>
//                   <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={() => setShowGuestModal(false)} />
//                   <StyledPopUpCard>
//                     <h3 style={{ fontFamily: "Work Sans" }}>Sign Up to Share Stories</h3>
//                     <p>Your words can inspire others. Create an account to unlock full access.</p>
//                     <PinkButton onClick={() => { setShowGuestModal(false); navigate("/signup"); }}>Sign Up</PinkButton>
//                     <PinkButton onClick={() => setShowGuestModal(false)} style={{ backgroundColor: "#ffd7e8", marginLeft: "1rem" }}>Cancel</PinkButton>
//                   </StyledPopUpCard>
//                 </>
//               )}
//             </StyledContainer>
//           </div>
//         ) : (
//           <>
//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "16px" }}>
//               <button onClick={handleAddStoryClick} style={{ width: 50, height: 50, borderRadius: "50%", fontSize: 28, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffbfdc", color: "white" }}>+</button>
//             </div>
//             <SuggestedTitle>Recent Stories</SuggestedTitle>
//           </>
//         )}

//         {/* Create Story Modal */}
//         {showModal && (
//           <>
//             <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={() => setShowModal(false)} />
//             <StyledPopUpCard>
//               <h3 style={{ fontFamily: "Work Sans" }}>Create a Story</h3>
//               <input 
//                 type="text" 
//                 placeholder="Title" 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ddd", borderRadius: 4, outline: "none" }} 
//               />
//               <textarea 
//                 placeholder="Description" 
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//                 style={{ width: "100%", height: 80, marginBottom: 8, padding: 8, border: "1px solid #ddd", borderRadius: 4, outline: "none", resize: "vertical" }} 
//               />
//               <input type="file" accept="image/*" onChange={handleImageUpload} />
//               {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: "100%", marginTop: 10, borderRadius: 8 }} />}
//               <button 
//                 onClick={handlePost} 
//                 disabled={isLoading}
//                 style={{ 
//                   marginTop: 10, 
//                   padding: "8px 16px", 
//                   cursor: isLoading ? "not-allowed" : "pointer", 
//                   width: "100%", 
//                   border: "none", 
//                   outline: "none", 
//                   borderRadius: "8px", 
//                   backgroundColor: isLoading ? "#ccc" : "#ffbfdc" 
//                 }}
//               >
//                 {isLoading ? "Posting..." : "Post"}
//               </button>
//             </StyledPopUpCard>
//           </>
//         )}

//         {/* Stories List */}
//         {stories.map((story) => (
//           <div 
//             key={story._id} 
//             style={{ 
//               border: "1px solid #ff69b4", 
//               borderRadius: 16, 
//               padding: 12, 
//               marginBottom: 16, 
//               textAlign: "left", 
//               backgroundColor: "white", 
//               boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)" 
//             }}
//           >
//             <p style={{ fontSize: 12, color: "#888" }}>
//               {new Date(story.createdAt).toLocaleString()}
//             </p>
//             <h3>{story.title}</h3>
//             {story.imageUrl && (
//               <img 
//                 src={story.imageUrl} 
//                 alt={story.title} 
//                 style={{ width: "100%", borderRadius: 10, marginBottom: 8 }} 
//               />
//             )}
//             <p>{story.content}</p>
//             <button 
//               onClick={() => handleDelete(story._id)} 
//               style={{ 
//                 background: "transparent", 
//                 border: "none", 
//                 fontSize: 18, 
//                 cursor: "pointer", 
//                 color: "#ff4d6d" 
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </StyledScroller>
//       <BottomNavigation />
//     </ScreenContainer>
//   );
// };

// export default Stories;
// >>>>>>> 7b9e4708a57e6326ef90454cc4259bee44318c62
