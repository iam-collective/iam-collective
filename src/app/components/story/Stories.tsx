import React from "react"
import * as S from './Stories.styles';
const Stories: React.FC = () => {
    return (
        <S.StoryScreen>
            <S.StoryHeader>
                
                <S.StoryTitle>Why We Wake Up At 6AM</S.StoryTitle>
                <S.StorySubtitle>The psychology of morning battles</S.StorySubtitle>

                <S.StoryMeta>
                    <span>By Abdi</span>
                    <span>Nov 22, 2025</span>
                </S.StoryMeta>
            </S.StoryHeader>

            <S.HeroImageWrapper>
                <S.HeroImage src="/image.jpg" />
                <S.HeroCaption>Stock image of someone regretting waking up</S.HeroCaption>
            </S.HeroImageWrapper>

            <S.StoryContent>
                <p>Your intro text...</p>

                <p>Your bed is a liar and a hater.</p>
                <h2>The Pull of Comfort</h2>
                <p>The brain negotiates with you...</p>
            </S.StoryContent>

            <S.StoryFooter>
            </S.StoryFooter>
        </S.StoryScreen>

    )
};

export default Stories;
