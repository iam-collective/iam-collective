import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { getUserFromStorage } from "../../utils/storage";
import * as S from './PostStories.styles';
import { StyledPopUpCard } from "./Stories.style";

interface PostStoriesProps {
  closeModal: () => void;
}

const PostStories: React.FC<PostStoriesProps> = ({ closeModal }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const userLocal = getUserFromStorage()
    const [isPublic, setIsPublic] = useState(true);

    const [showSuccess, setShowSuccess] = useState(false);

    const uploadStory = useMutation(api.stories.uploadStory);
    const generateUploadUrl = useMutation(api.stories.generateUploadUrl);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
    };

  const handlePost = async () => {
    if (!title || !description) return alert('Please fill everything!');

    setIsLoading(true);

    try {
      let imageId: Id<'_storage'> | undefined;

            if (imageFile) {
                const uploadUrl = await generateUploadUrl();

                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": imageFile.type },
                    body: imageFile,
                });

        if (!result.ok) {
          throw new Error('Failed to upload image');
        }

                const { storageId } = await result.json();
                imageId = storageId;
            }
            await uploadStory({
                title,
                content: description,
                imageId,
                isPublic,
                username: userLocal.fullName !== '' ? userLocal.fullName : "Anonymous",
            });

            setTitle("");
            setDescription("");
            setImageFile(null);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                closeModal();
            }, 1500);

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
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <S.TextArea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <S.Input type='file' accept='image/*' onChange={handleImageUpload} />

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

            {/* Success Popup */}
            {showSuccess && (
                <S.SuccessPopup>
                    Your story has been posted!
                </S.SuccessPopup>
            )}
        </>
    );
};

export default PostStories;
