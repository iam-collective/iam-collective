import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from '../buttons';

export const Container = styled.div`

  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('/crocus.jpg') no-repeat center center;
  background-size: cover; 
  text-align: center;
  padding: 1.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(230, 220, 255, 0.5);
    z-index: -1;
  }
  @media (max-width: 768px) {
    padding: 1rem;
    background-position: center;

    
    
  }
`;



export const CardWrapper = styled.div`
  width: 100%;
  height: fit-content;
  background: white;
  border-radius: 2rem;
  margin-top: -6rem;
  padding: 1rem;
  z-index: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
`;

export const ScreenContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;


export const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  overflow: hidden;
  padding: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
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
  font-family: 'Work Sans', sans-serif;

  &:hover {
    background-color: #ffbfdc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LandingCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  padding: 2rem;
  margin: 3rem auto;
  background: linear-gradient(180deg, #FAF0E6 0%, #FDEDF4 100%);
  border-radius: 2rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  text-align: center;

  @media (max-width: 768px) {
    margin: 1.5rem;
    padding: 1.5rem;
  }
`;


export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.6);
    padding: 0.75rem 1rem;
  }
`;

export const LogoText = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #6a0dad;
  cursor: pointer;

  &:hover {
    color: #9b30ff;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: #7b1fa2;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #9b30ff;
    }
  }
  @media (max-width: 768px) {
    gap: 1rem;

    a {
      font-size: 0.9rem;
    }
  }
`;

export const Logo = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  background-color: #c3b1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
  }
`;

export const Icon = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  color: #9b30ff;
  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }


`;

export const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #2e004f;
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const HeroText = styled.p`
  font-size: 1.125rem;
  color: #2e004f;
  max-width: 28rem;
  margin: 0 auto;


  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

export const CTAButton = styled(Button)`
background-color: #9b30ff;
  color: white;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 2rem;
  box-shadow: 0 4px 14px rgba(126, 34, 206, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b1fa2;
  }

  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

export const Footer = styled.footer`
  margin-top: 3rem;
  font-size: 0.8rem;
  color: #6a0dad;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-top: 2rem;
  }
`;


export const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #7b1fa2;
  font-weight: 500;

  img {
    height: 22px;
    width: auto;
    object-fit: contain;
  }

  span {
    font-size: 0.75rem;
    color: #6a0dad;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;
