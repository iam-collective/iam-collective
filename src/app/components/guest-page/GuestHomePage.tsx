/* eslint-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScreenContainer,
  Card,
  SuggestedWrapper,
  SuggestedTitle,
  CardText,
  CardHeading,
  CardDescription,
  CardLink,
  LotusEmoji,
  SuggestedCardsContainer,
} from '../home/HomePage.styled';
import BottomNavigation from '../bottom-nav/BottomNav';
import Banner from '../banner/Banner';
import SideNavigation from '../bottom-nav/SideNav';
import FloatingStoryButton from '../about-page/floating-button/FloatingStoryButton';

const GuestHomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      headline: 'Together, Our Stories Break the Silence ',
      subline:
        'Collective storytelling turns pain into learning, learning into courage, and courage into safer futures for us all.',
      cta: '[Become a Member]',
      link: '/signup',
      restricted: true,
    },
    {
      headline: 'What is The I AM Collective?',
      subline: 'The I AM Collective is a healing movement and digital community...',
      cta: 'Learn More',
      link: '/about',
      restricted: false,
    },
  ];

  return (
    <ScreenContainer>
      <Banner>
        <SideNavigation variant='home' />
      </Banner>

      <SuggestedWrapper>
        <SuggestedTitle>Suggested for you (Guest)</SuggestedTitle>
        <SuggestedCardsContainer>
          {cardsData.map((card, index) => (
            <Card key={index}>
              <CardText>
                <CardHeading>{card.headline}</CardHeading>
                {card.subline && <CardDescription>{card.subline}</CardDescription>}
                {card.cta && !card.restricted && (
                  <CardLink onClick={() => card.link && navigate(card.link)}>{card.cta}</CardLink>
                )}
                {card.restricted && (
                  <CardLink onClick={() => navigate('/signup')} style={{ opacity: 0.6 }}>
                    {card.cta} (Sign up to access)
                  </CardLink>
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

export default GuestHomeScreen;
