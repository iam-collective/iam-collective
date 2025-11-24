/* eslint-disable */
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { Button } from '../buttons';

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

export const LogoWrapper = styled.div`
  text-align: center;
  animation: ${float} 3s ease-in-out infinite;
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
  font-family: 'Lora', serif;

  &:hover {
    background-color: #ffbfdc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
`;

export const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

export const DividerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  gap: 2rem;
`;

export const Line = styled.div`
  width: 50%;
  height: 2px;
  background-color: rgb(255, 105, 180);
`;

export const DividerText = styled.span`
  margin: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  text-align: center;
  font-family: 'Lora';
  h3,
  p {
    margin: 0;
    padding: 0;
  }
`;

export const NextButton = styled(Button)`
  background-color: rgb(255, 105, 180);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff85c0;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;
`;

export const FooterText = styled.span`
  font-size: 0.9rem;
  color: rgb(150, 150, 150);
`;

export const FooterLogos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const FooterLogo = styled.img`
  width: 80px;
  height: auto;
`;

export const LogoDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: rgb(200, 200, 200);
`;
