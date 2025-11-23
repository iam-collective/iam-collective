import React, { useState } from "react"
import { StyledPopUpCard } from "./Stories.style";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import * as S from './PostStories.styles'
interface PostStoriesProps {
    closeModal: () => void;
}
const PostStories: React.FC<PostStoriesProps> = ({ closeModal }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isPublic, setIsPublic] = useState(true);
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
                isPublic
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
            <S.Backdrop onClick={closeModal} />

            <StyledPopUpCard>
                <h3>Create a Story</h3>

                <S.Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <S.TextArea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <S.Input type="file" accept="image/*" onChange={handleImageUpload} />

                {imageFile && (
                    <S.PreviewImage
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                    />
                )}
                <S.SelectWrapper>

                    <S.Select
                        value={isPublic ? "public" : "private"}
                        onChange={(e) => setIsPublic(e.target.value === "public")}
                    >
                        <option value="public">Post Publicly</option>
                        <option value="private">Post Privately (Anonymous)</option>
                    </S.Select>
                    <S.DropdownArrow>▼</S.DropdownArrow>
                </S.SelectWrapper>
                <S.SubmitButton onClick={handlePost} $loading={isLoading}>
                    {isLoading ? "Posting..." : "Post"}
                </S.SubmitButton>
            </StyledPopUpCard>
        </>

    )
};

export default PostStories;
