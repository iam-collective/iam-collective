/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScreenContainer,
  Logo,
  DividerWrapper,
  Line,
  DividerText,
  Footer,
  FooterText,
  FooterLogos,
  FooterLogo,
  MainContent,
  LogoDivider,
  PinkButton,
  LogoWrapper,
} from './LandingPage.styles';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <MainContent>
        <LogoWrapper>
          <Logo src='/Header-Logo.png' alt='IAMCOLLECTIVE Logo' />
        <LogoWrapper>
          <Logo src='/Header-Logo.png' alt='IAMCOLLECTIVE Logo' />
        </LogoWrapper>

        <DividerWrapper>
          <Line />
          <DividerText>
            <h3>Welcome to IAM Collective</h3>
            Thank you for being one of our first pioneers. This is our very first version, with the
            core focus on story submission journey. Your story and your feedback will help us ensure
            we evolve in a way that's relevant Thank you for contribution in fight against GBV.
          </DividerText>
          <Line />
        </DividerWrapper>

        <PinkButton onClick={() => navigate('/continue')}>Next</PinkButton>
      </MainContent>

      <Footer>
        <FooterText>I AM Collective is powered by</FooterText>
        <FooterLogos>
          <FooterLogo src='/MTN-Logo.png' alt='MTN-Logo' />
          <LogoDivider />
          <FooterLogo src='/chenosis.png' alt='chenosis' />
        </FooterLogos>
      </Footer>
    </ScreenContainer>
  );
}
