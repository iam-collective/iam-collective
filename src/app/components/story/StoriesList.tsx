import React from "react"
import { CardGrid } from "../micro-lessons/Cards.styles";
import * as S from "./Stories.style";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { truncateText } from "../../utils/stories-util";
import { getUserFromStorage } from "../../utils/storage";
type StoriesQueryType = {
    username?: string;
    imageUrl: string | null;
    _id: Id<"stories">;
    _creationTime: number;
    imageId?: Id<"_storage">;
    isPublic?: boolean;
    createdAt: number;
    userId: string;
    title: string;
    content: string;
};
type StoriesListProp = {
    stories: StoriesQueryType[];
}
const StoriesList: React.FC<StoriesListProp> = ({ stories }) => {

    if (!stories) return null;
    return (
        <>
            <S.Container>
                <S.SuggestedTitle>Recent Stories</S.SuggestedTitle>
                <S.MyStories to={'my-stories'}>My Stories</S.MyStories>
            </S.Container>
            <CardGrid>
                {stories.map((story) => (
                    <S.StyledCard
                        key={story._id}
                    >
                        <S.Username>{story.username}</S.Username>
                        <S.Date>
                            {new Date(story.createdAt).toLocaleString()}
                        </S.Date>
                        <S.Title to={`${story._id}`}>{story.title}</S.Title>
                        <S.Content>{truncateText(story.content, 20)}

                        </S.Content>

                        {story.imageUrl && (
                            <S.StyledCardImage
                                src={story.imageUrl}
                                alt={story.title}
                            />
                        )}
                        <S.Wrapper>
                            <S.ReadMore to={`${story._id}`}>Read More</S.ReadMore>
                        </S.Wrapper>
                    </S.StyledCard>
                ))
                }
            </CardGrid >
        </>
    )
};

export default StoriesList;
