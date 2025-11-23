import styled from "styled-components";

export const StoryScreen = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1.5rem;
  border-radius: 2rem;
  overflow: auto;
  width: 100%;
  /* max-width: 760px; */
  /* box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12); */

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 1rem;
  }
`;
export const BackButton = styled.button`
  background: none;
  border: none;
  color: #ff69b4;
  font-size: 1rem;
  padding: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

export const StoryHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  text-align: left;
`;

export const StoryTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Work Sans', sans-serif;
  margin: 0;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const StorySubtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0.5rem 0 0;
`;

export const StoryMeta = styled.div`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #888;
  display: flex;
  gap: 1rem;
`;

export const HeroImageWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  overflow: hidden;
  margin: 1.5rem 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
`;

export const HeroImage = styled.img`
  width: 90%;
  height: 10rem;
  height: auto;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

export const HeroCaption = styled.p`
  text-align: center;
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.5rem;
`;

export const StoryContent = styled.section`
  font-size: 1.1rem;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.7;
  color: #333;

  p {
    margin: 1.25rem 0;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    color: #1a1a1a;
  }

  h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
    color: #1a1a1a;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1.25rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const QuoteBlock = styled.blockquote`
  background: #ffe0f1;
  border-left: 5px solid #ff69b4;
  padding: 1rem 1.25rem;
  margin: 2rem 0;
  font-style: italic;
  border-radius: 0.5rem;
  color: #444;
`;

export const InlineImageWrapper = styled.figure`
  margin: 2rem 0;
  text-align: center;
`;

export const InlineImage = styled.img`
  max-width: 100%;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const InlineCaption = styled.figcaption`
  font-size: 0.85rem;
  color: #777;
  margin-top: 0.5rem;
`;

export const StoryFooter = styled.footer`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StoryTags = styled.div`
  font-size: 0.9rem;
  color: #6b7280;

  a {
    color: #ff69b4;
    text-decoration: none;
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

export const ShareSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    font-weight: bold;
    font-size: 0.9rem;
  }

  a {
    color: #ff69b4;
    text-decoration: none;
  }
`;
