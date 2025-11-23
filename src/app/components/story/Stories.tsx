import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useAuth } from '../../context/AuthContext';
import NoStoriesPage from './NoStoriesPage';
import PostStories from './PostStories';
import * as S from './Stories.style';
import StoriesList from "./StoriesList";
import { useNavigate } from "react-router-dom";
import SignUpGuestModal from "./SignUpGuestModal";



const Stories: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { isGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showGuestModal, setShowGuestModal] = useState(false);

  const stories = useQuery(api.stories.listStories);

  const handleAddStoryClick = () => {
    if (isGuest && !isAuthenticated) {
      setShowGuestModal(true);
    } else {
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  }
  const closeGuestModal = () => {
    setShowGuestModal(false);
  }

  const showGuest = () => {
    setShowGuestModal(true);
  }
  function navigateToSignUp() {
    navigate('/signup');
  }
  
  // Loading state
  if (stories === undefined) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}
      >
        <p>Loading stories...</p>
      </div>
    );
  }

  return (
    <S.StyledScroller>
      {stories.length === 0 ? (
        <NoStoriesPage showGuest={showGuest} showModal={openModal} closeModal={closeModal} isGuest={showGuestModal} />
      ) : (
        <>
          <S.AddStoryWrapper>
            <S.AddStoryButton onClick={handleAddStoryClick}>+</S.AddStoryButton>
          </S.AddStoryWrapper>

        </>
      )}
      {showGuestModal && (
        <SignUpGuestModal closeModal={closeGuestModal} />
      )}
      {showModal && (
        <PostStories closeModal={closeModal} />
      )}
      <StoriesList stories={stories} />
    </S.StyledScroller>
  );
};

export default Stories;
