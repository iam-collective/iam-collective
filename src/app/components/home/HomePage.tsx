/* eslint-disable react/jsx-no-bind */
/* eslint-disable  @typescript-eslint/no-floating-promises */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, GraduationCap, Heart, Fan, Book } from 'lucide-react';
import {
  ScreenContainer,
  ImageCard,
  BackgroundImage,
  Card,
  OverlayText,
  Author,
  ProfileImage,
  SuggestedWrapper,
  SuggestedTitle,
  CardText,
  CardHeading,
  CardDescription,
  CardLink,
  LotusEmoji,
  BottomNav,
  HomeIndicator,
  Quote,
} from './HomePage.styled';
import AffirmationCards from '../cards/Cards';
import { defaultAffirmations } from '../../../services/affirmations';
import BottomNavigation from '../bottom-nav/BottomNav';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (navigateTo: string): void => {
    navigate(navigateTo);
  };

  return (
    <ScreenContainer>
      <ImageCard>
        <BackgroundImage
          src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
          alt='Nature background'
        />
        <OverlayText>
          <Quote>This is a daily affirmation of support and positivity.</Quote>
          <Author>– The author</Author>
          <ProfileImage
            as='svg'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            className='rounded-full bg-gray-200 text-gray-400'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='12' cy='8' r='4' fill='currentColor' />
            <path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='currentColor' />
          </ProfileImage>
        </OverlayText>
      </ImageCard>

      {/* <SuggestedWrapper>
        <SuggestedTitle>Affirmations for you</SuggestedTitle>
        <Card>
          <CardText>
            <CardHeading>Daily Affirmation</CardHeading>
            <CardDescription>
              I am a card descriptor piece of text that gives context.
            </CardDescription>
            <CardLink>Explore more </CardLink>
          </CardText>
          <LotusEmoji>🌸</LotusEmoji>
        </Card>
      </SuggestedWrapper> */}
      <AffirmationCards items={defaultAffirmations} />
      <BottomNavigation></BottomNavigation>

      {/* <BottomNav>
        <GraduationCap
          size={24}
          opacity={0.4}
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigate('/quotes')}
        />
        <Heart size={24} opacity={0.4} />
        <HomeIndicator>
          <Home size={28} color='#d31875' />
        </HomeIndicator>
        <Fan size={24} opacity={0.4} />
        <Book
          size={24}
          opacity={0.4}
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigate('/stories')}
        />
      </BottomNav> */}
    </ScreenContainer>
  );
};

export default HomeScreen;
