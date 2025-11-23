import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ScreenContainer = styled.main`
display: flex;
flex-direction: column;
  position: relative;
  height: 100vh;
  gap: 1rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 0 .5rem;
`;
export const StoryWrapper = styled.div`
  padding: 1rem;
`;
export const StyledContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  overflow: hidden;
  padding: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

export const StyledPostButton = styled.div`
  margin-top: 10;
  padding: 8px 16px;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  background-color: #ff69b4;
`;

export const StyledPopUpCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 350px;
  z-index: 20;
  text-align: center;
  border-color: #ff69b4;
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: fit-content;
  background: white;
  border-radius: 2rem;
  margin-top: -6rem;
  padding: 1rem;
  z-index: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
`;

export const PinkButton = styled.button`
  background-color: #ffd7e8;
  color: #1a1a1a;
  padding: 20px 33px;
  font-size: 1.5rem;
  font-weight: 500;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Work Sans', sans-serif;

  &:hover {
    background-color: #ffbfdc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StyledScroller = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--app-container-vertical-margin-small, 8px);
  align-self: stretch;
  overflow: scroll;
  overflow: auto;
  padding: 0 1rem;
  scrollbar-width: none;
  flex: 1;
/* hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 3rem;
`;

export const AddStoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

export const AddStoryButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 28px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffbfdc;
  color: white;
`;



export const SuggestedTitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  font-weight: 750;
  margin: 0;
`;


export const StyledCard = styled.article`
    border: 1px solid #ff69b4;
    border-radius: 1rem ;
    max-width: 100%;
    position: relative;
    /* overflow: hidden; */
    padding: 1.25rem;
    text-align: left ;
    max-height: 20rem;
    background-color: white ;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1) ;
`;
export const Username = styled.span`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ff69b4;
  opacity: 0.8;
`;

export const StyledCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
  margin-bottom: 8px;
  object-fit: cover;
  max-height: 10rem;
`;


export const Date = styled.p`
  font-size: 12px;
  color: #888;  
`

export const Content = styled.p`
display: block;

`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
`
export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 0;
`
export const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #ff7875;
  }
`

export const Title = styled(Link)`
display: block;
  font-size: 1.25rem;
  margin: 0;
  padding: 0;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const MyStories = styled(Link)`
  background-color: #ff69b4;
  color: white;
  border: 1px solid black;
  padding: 1rem 1.25rem;
  border-radius: .5rem;
  text-decoration: none;
  font-weight: bold;
  &:hover{
    background-color: #ffbfdc;
  }

`;

export const ReadMore = styled(Link)`
  text-decoration: none;
  color: #ff69b4;
  font-weight: bold;

`;

export const InlineBackButton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`