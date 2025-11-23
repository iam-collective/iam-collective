import React, { useState } from "react"
import { StyledPopUpCard } from "./Stories.style";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface PostStoriesProps {
    closeModal: () => void;
}
const PostStories: React.FC<PostStoriesProps> = ({ closeModal }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    // Convex hooks - use api object for proper typing
    const uploadStory = useMutation(api.stories.uploadStory);
    const generateUploadUrl = useMutation(api.stories.generateUploadUrl);
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
            closeModal()
        } catch (error) {
            console.error("Failed to post story:", error);
            alert("Failed to post story. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div style={{ position: "fixed", inset: 0, backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.35)", zIndex: 10 }} onClick={closeModal} />
            <StyledPopUpCard>
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
            </StyledPopUpCard>
        </>

    )
};

export default PostStories;
