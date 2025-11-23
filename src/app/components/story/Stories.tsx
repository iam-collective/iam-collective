import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useAuth } from '../../context/AuthContext';
import NoStoriesPage from './NoStoriesPage';
import PostStories from './PostStories';
import * as S from './Stories.style';
import StoriesList from './StoriesList';

interface StoryProps {
  _id: Id<'stories'>;
  title: string;
  content: string;
  imageId?: Id<'_storage'>;
  imageUrl: string | null;
  createdAt: number;
  userId: string;
}

const Stories: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { isGuest, isAuthenticated } = useAuth();
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Convex hooks - use api object for proper typing
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
  };
  const openModal = () => {
    setShowModal(true);
  };
  const showGuest = () => {
    setShowGuestModal(true);
  };
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
        <NoStoriesPage showGuest={showGuest} showModal={openModal} closeModal={closeModal} />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '16px',
            }}
          >
            <button
              onClick={handleAddStoryClick}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                fontSize: 28,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffbfdc',
                color: 'white',
              }}
            >
              +
            </button>
          </div>
          <S.SuggestedTitle>Recent Stories</S.SuggestedTitle>
        </>
      )}
      {showModal && <PostStories closeModal={closeModal} />}
      <StoriesList />
    </S.StyledScroller>
  );
};

export default Stories;
