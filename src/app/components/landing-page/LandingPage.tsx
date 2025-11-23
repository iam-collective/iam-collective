/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScreenContainer,
  Logo,
  DividerWrapper,
  Line,
  DividerText,
  NextButton,
  Footer,
  FooterText,
  FooterLogos,
  FooterLogo,
  MainContent,
  LogoDivider,
  PinkButton,
} from './LandingPage.styles';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <MainContent>
        <Logo src='/Header-Logo.png' alt='IAMCOLLECTIVE Logo' />

        <DividerWrapper>
          <Line />
          <DividerText>
          Welcome to IAM Collective, a safe and supportive self-healing circle for people impacted by GBV, whether directly or indirectly.
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
          {/* <LogoDivider />
          <FooterLogo src='/unite.png' alt='unite' /> */}
        </FooterLogos>
      </Footer>
    </ScreenContainer>
  );
}
