import React, { useState } from 'react';
import { PinkButton, ScreenContainer, StyledPopUpCard, StyledScroller } from './Stories.style';
import Header from '../header/Header';
import { BottomNav, HomeIndicator } from '../home/HomePage.styled';
import { GraduationCap, Heart, Home, Fan, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollHandler } from '../../hooks/use-scroll-handler';

interface StoryProps {
  title: string;
  description: string;
  image?: string;
}

const Stories: React.FC = () => {
  const [posts, setPosts] = useState<StoryProps[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    if (!title || !description) return alert('Please fill everything!');

    setPosts([...posts, { title, description, image }]);

    setTitle('');
    setDescription('');
    setImage(undefined);
    setShowModal(false);
  };

  const navigate = useNavigate();

  const handleNavigate = (navigateTo: string): void => {
    navigate(navigateTo);
  };

  const { handleScroll } = useScrollHandler(setIsScrolling);

  return (
    <>
      <ScreenContainer>
        <Header title='Stories' />
        <StyledScroller onScroll={handleScroll}>
          {posts.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                marginTop: '24px',
              }}
            >
              <PinkButton onClick={() => setShowModal(true)}>Add a Story</PinkButton>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <button
                onClick={() => setShowModal(true)}
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
          )}

          <div
            style={{
              fontFamily: 'Arial',
              textAlign: 'center',
            }}
          >
            {showModal && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    zIndex: 10,
                  }}
                  onClick={() => setShowModal(false)}
                />

                <StyledPopUpCard>
                  <h3 style={{ fontFamily: 'Work Sans' }}>Create a Story</h3>

                  <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      width: '100%',
                      marginBottom: 8,
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                    }}
                  />

                  <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      width: '100%',
                      height: 80,
                      marginBottom: 8,
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                    }}
                  />

                  <input type='file' accept='image/*' onChange={handleImageUpload} />

                  {image && (
                    <img
                      src={image}
                      alt=''
                      style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
                    />
                  )}

                  <button
                    onClick={handlePost}
                    style={{
                      marginTop: 10,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      borderRadius: '8px',
                      backgroundColor: '#ffbfdc',
                    }}
                  >
                    Post
                  </button>
                </StyledPopUpCard>
              </>
            )}

            {posts.map((post, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 16,
                  textAlign: 'left',
                  borderColor: '#ff69b4',
                  backgroundColor: 'white',
                }}
              >
                <h3>{post.title}</h3>
                {post.image && (
                  <img src={post.image} alt='' style={{ width: '100%', borderRadius: 10 }} />
                )}
                <p>{post.description}</p>
              </div>
            ))}
          </div>
        </StyledScroller>
        <BottomNav>
          <GraduationCap size={24} opacity={0.4} />
          <Heart size={24} opacity={0.4} />
          <HomeIndicator>
            <Home
              size={28}
              color='#d31875'
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavigate('/')}
            />
          </HomeIndicator>
          <Fan size={24} opacity={0.4} />
          <Book size={24} opacity={0.4} />
        </BottomNav>
      </ScreenContainer>
    </>
  );
};

export default Stories;
