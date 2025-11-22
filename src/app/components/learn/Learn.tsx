/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../bottom-nav/BottomNav';
import {
  BlueCard,
  CentredCard,
  OrangeCard,
  PinkCard,
  SubTitle,
} from '../cards/Cards.style';
import {
  LotusEmoji,
  ProfileImage,
  ScreenContainer
} from '../home/HomePage.styled';
import {
  ButtonWrapper,
  CarouselCard,
  CarouselContainer,
  CarouselWrapper,
  Header,
  LearnCardDescription,
  LearnCardHeading,
  LearnCardText,
  NextButton,
  ScrollableContent,
} from './Learn.styled';
// import HeaderComponent from '../micro-lessons/Header';
const LearnScreen: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (navigateTo: string): void => {
    navigate(navigateTo);
  };
  
  return (
    <ScreenContainer>
      {/* <HeaderComponent title='' /> */}
      <ScrollableContent>
        <Header>
          Knowledge is strength. Your journey to empowerment through upskilling starts here.
        </Header>
        <ProfileImage/>
        <SubTitle>We curate content according to three categories:</SubTitle>

        <CarouselWrapper>
          <CarouselContainer>
            <CarouselCard>
              <PinkCard>
                <CentredCard>
                  <LearnCardText>
                    <LotusEmoji>🌸</LotusEmoji>
                    <LearnCardHeading>Mindfulness</LearnCardHeading>
                    <LearnCardDescription>
                      Tools to help you master stress, get in touch with your inner voice, and record
                      your journey.
                    </LearnCardDescription>
                  </LearnCardText>
                </CentredCard>
              </PinkCard>
            </CarouselCard>
            
            <CarouselCard>
              <OrangeCard>
                <CentredCard>
                  <LearnCardText>
                    <LotusEmoji>🌸</LotusEmoji>
                    <LearnCardHeading>Empowerment</LearnCardHeading>
                    <LearnCardDescription>
                      Tools to help you manage and avoid conflict. Learn healthy response patterns, and
                      identify red flags more effectively.
                    </LearnCardDescription>
                  </LearnCardText>
                </CentredCard>
              </OrangeCard>
            </CarouselCard>
            
            <CarouselCard>
              <BlueCard>
                <CentredCard>
                  <LearnCardText>
                    <LotusEmoji>🌸</LotusEmoji>
                    <LearnCardHeading>Life Skills</LearnCardHeading>
                    <LearnCardDescription>
                      Tools to upskill yourself holistically and keep that work/life balance in check.
                    </LearnCardDescription>
                  </LearnCardText>
                </CentredCard>
              </BlueCard>
            </CarouselCard>
          </CarouselContainer>
        </CarouselWrapper>
        
        <ButtonWrapper>
          <NextButton to={'/micro-lessons'}>Next</NextButton>
        </ButtonWrapper>
      </ScrollableContent>
      
      <BottomNavigation></BottomNavigation>
    </ScreenContainer>
  );
};

export default LearnScreen;
