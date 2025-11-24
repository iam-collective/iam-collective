/* eslint-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScreenContainer,
  Card,
  ProfileImage,
  SuggestedWrapper,
  SuggestedTitle,
  CardText,
  CardHeading,
  CardDescription,
  CardLink,
  LotusEmoji,
  SuggestedCardsContainer,
} from './HomePage.styled';
import BottomNavigation from '../bottom-nav/BottomNav';
import Banner from '../banner/Banner';
import { useAuth } from '../../context/AuthContext';
import SideNavigation from '../bottom-nav/SideNav';
import FloatingStoryButton from '../about-page/floating-button/FloatingStoryButton';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // get signed-up user data

  const cardsData = [
    {
      headline: 'Together, Our Stories Break the Silence ',
      subline:
        'Collective storytelling turns pain into learning, learning into courage, and courage into safer futures for us all.',
      cta: '[Become a Member]',
      link: '/signup',
    },
    {
      headline: 'Your Story Is Strength — Speak to Heal',
      subline:
        'By sharing what you’ve endured, you give voice to your journey — and help build a safer path for others still finding theirs.',
      cta: 'Click here to share your story & help build a community creating safe spaces ',
      link: '/stories',
    },
    {
      headline: 'Share to Shape Healing ',
      subline:
        'When you tell your lived experience, you help us learn — and together we create the tools for understanding, boundaries, and bravery.',
      cta: 'Click here to share your story & help build a community creating safe spaces ',
      link: '/stories',
    },
    {
      headline: 'Speak Up. This Is Action. ',
      subline:
        'Your voice matters: sharing your story becomes our collective education, building power and protection in community.',
      cta: 'Click here to share your story & help build a community creating safe spaces ',
      link: '/stories',
    },
    {
      headline: 'Who We Are',
      subline:
        'We’re a healing movement and digital community created to support anyone affected by gender-based violence (GBV). Our collective stories and learning is how we help each other recognise abuse, heal from it, and change how we show up in our homes, workplaces and online spaces.',
      cta: 'Who we are',
      link: '/about',
    },
    {
      headline: 'When one person heals, we all move.',
      subline:
        'When we change the conversation, we change behaviour. When we speak up, connect and heal, we create safer communities.',
      cta: 'Be the change. Continue your journey',
      link: '/learn',
    },
  ];
  console.log('rendering home page.............')
  return (
    <ScreenContainer>
      <Banner>
        <SideNavigation variant='home' />
      </Banner>

      <SuggestedWrapper>
        <SuggestedTitle>Welcome back, {user?.fullName || 'Friend'}!</SuggestedTitle>
        <SuggestedCardsContainer>
          {cardsData.map((card, index) => (
            <Card key={index}>
              <CardText>
                <CardHeading>{card.headline}</CardHeading>
                {card.subline && <CardDescription>{card.subline}</CardDescription>}
                {card.cta && card.link && (
                  <CardLink onClick={() => navigate(card.link)}>{card.cta}</CardLink>
                )}
              </CardText>
              <LotusEmoji>🌸</LotusEmoji>
            </Card>
          ))}
        </SuggestedCardsContainer>
      </SuggestedWrapper>

      <FloatingStoryButton />
      <BottomNavigation />
    </ScreenContainer>
  );
};

export default HomeScreen;
