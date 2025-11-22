import React, { useState } from "react";
import * as S from './StoriesCard.style';
import { useScrollHandler } from '../../hooks/use-scroll-handler';
import BottomNavigation from '../bottom-nav/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { Outlet, useNavigate } from 'react-router';
import Header from '../micro-lessons/Header';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { CardGrid } from "../micro-lessons/Cards.styles";
import { truncateText } from "../../utils/stories-util";

interface StoryProps {
  _id: Id<"stories">;
  title: string;
  content: string;
  imageId?: Id<"_storage">;
  imageUrl: string | null;
  createdAt: number;
  userId: string;
}

const StoriesCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isGuest, isAuthenticated } = useAuth();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const { handleScroll } = useScrollHandler(setIsScrolling);

  // Convex hooks - use api object for proper typing
  const stories = useQuery(api.stories.listStories);
  const uploadStory = useMutation(api.stories.uploadStory);
  const generateUploadUrl = useMutation(api.stories.generateUploadUrl);
  const deleteStory = useMutation(api.stories.deleteStory);

  const handleDelete = async (storyId: Id<"stories">) => {
    try {
      await deleteStory({ storyId });
    } catch (error) {
      console.error("Failed to delete story:", error);
      alert("Failed to delete story. You may not have permission.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handlePost = async () => {
    if (!title || !description) return alert("Please fill everything!");

    setIsLoading(true);

    try {
      let imageId: Id<"_storage"> | undefined;

      if (imageFile) {
        // Step 1: Get upload URL from Convex
        const uploadUrl = await generateUploadUrl();

        // Step 2: Upload file directly to Convex storage
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        const { storageId } = await result.json();
        imageId = storageId;
      }

      // Step 3: Create the story with the image reference
      await uploadStory({
        title,
        content: description,
        imageId,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImageFile(null);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to post story:", error);
      alert("Failed to post story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStoryClick = () => {
    if (isGuest && !isAuthenticated) {
      setShowGuestModal(true);
    } else {
      setShowModal(true);
    }
  };

  // Loading state
  if (stories === undefined) {
    return (
      <S.ScreenContainer>
        <Header title="Stories" />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <p>Loading stories...</p>
        </div>
        <BottomNavigation />
      </S.ScreenContainer>
    );
  }


  return (
    <S.StyledScroller onScroll={handleScroll}>
      {stories.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: "24px" }}>
          <S.StyledContainer style={{ background: "linear-gradient(180deg, #FAF0E6 0%, #FDEDF4 100%)", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "purple", marginBottom: "0.5rem", fontFamily: "Lora" }}>Share your story</h1>
            <p style={{ fontSize: "1.5rem", maxWidth: "320px", color: "#6b6b6b", marginBottom: "2rem" }}>
              Your words can inspire someone. Tell us about a moment, a feeling, or something you learned.
            </p>
            <S.PinkButton onClick={handleAddStoryClick}>
              Add a Story
            </S.PinkButton>

            {showGuestModal && (
              <>
                <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={() => setShowGuestModal(false)} />
                <S.StyledPopUpCard>
                  <h3 style={{ fontFamily: "Work Sans" }}>Sign Up to Share Stories</h3>
                  <p>Your words can inspire others. Create an account to unlock full access.</p>
                  <S.PinkButton onClick={() => { setShowGuestModal(false); navigate("/signup"); }}>Sign Up</S.PinkButton>
                  <S.PinkButton onClick={() => setShowGuestModal(false)} style={{ backgroundColor: "#ffd7e8", marginLeft: "1rem" }}>Cancel</S.PinkButton>
                </S.StyledPopUpCard>
              </>
            )}
          </S.StyledContainer>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "16px" }}>
            <button onClick={handleAddStoryClick} style={{ width: 50, height: 50, borderRadius: "50%", fontSize: 28, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffbfdc", color: "white" }}>+</button>
          </div>
          <S.SuggestedTitle>Recent Stories</S.SuggestedTitle>
        </>
      )}

      {/* Create Story Modal */}
      {showModal && (
        <>
          <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={() => setShowModal(false)} />
          <S.StyledPopUpCard>
            <h3 style={{ fontFamily: "Work Sans" }}>Create a Story</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ddd", borderRadius: 4, outline: "none" }}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", height: 80, marginBottom: 8, padding: 8, border: "1px solid #ddd", borderRadius: 4, outline: "none", resize: "vertical" }}
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: "100%", marginTop: 10, borderRadius: 8 }} />}
            <button
              onClick={handlePost}
              disabled={isLoading}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                cursor: isLoading ? "not-allowed" : "pointer",
                width: "100%",
                border: "none",
                outline: "none",
                borderRadius: "8px",
                backgroundColor: isLoading ? "#ccc" : "#ffbfdc"
              }}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </S.StyledPopUpCard>
        </>
      )}

      {/* Stories List */}
      <CardGrid>
        {stories.map((story) => (
          <S.StyledCard
            key={story._id}
          >
            <S.Date>
              {new Date(story.createdAt).toLocaleString()}
            </S.Date>
            <S.Title to={`${story._id}`}>{story.title}</S.Title>
            <S.Content>{truncateText(story.content, 20)}

              <S.ReadMore to={`${story._id}`}>Read More</S.ReadMore>
            </S.Content>
            {story.imageUrl && (
              <S.StyledCardImage
                src={story.imageUrl}
                alt={story.title}
              />
            )}
            <S.DeleteButton
              onClick={() => handleDelete(story._id)}
            >
              Delete
            </S.DeleteButton>
          </S.StyledCard>
        ))}
      </CardGrid>
    </S.StyledScroller>
  );
};

export default StoriesCard;