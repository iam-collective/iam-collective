import React from "react"
import { CardGrid } from "../micro-lessons/Cards.styles";
import * as S from "./Stories.style";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { truncateText } from "../../utils/stories-util";

const StoriesList: React.FC = () => {
    const deleteStory = useMutation(api.stories.deleteStory);

    const stories = useQuery(api.stories.listStories);
    const handleDelete = async (storyId: Id<"stories">) => {
        try {
            await deleteStory({ storyId });
        } catch (error) {
            console.error("Failed to delete story:", error);
            alert("Failed to delete story. You may not have permission.");
        }
    };
    if (!stories) return null;
    return (
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
    )
};

export default StoriesList;
