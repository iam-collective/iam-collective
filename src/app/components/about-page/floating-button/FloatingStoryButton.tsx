import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import {
  FABContainer,
  GlowEffect,
  ParticleContainer,
  Particle,
  FABContent,
  IconWrapper,
  TextWrapper,
  MainText,
  SubText,
  RippleEffect,
} from './FloatingStoryButton.styled';

const FloatingStoryButton: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate('/stories');
  };

  return (
    <FABContainer
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $isHovered={isHovered}
    >
      <GlowEffect $isHovered={isHovered} />
      <ParticleContainer>
        <Particle $delay={0} />
        <Particle $delay={0.3} />
        <Particle $delay={0.6} />
        <Particle $delay={0.9} />
      </ParticleContainer>

      <FABContent>
        <IconWrapper $isHovered={isHovered}>
          <BookOpen size={24} strokeWidth={2.5} />
        </IconWrapper>
        <TextWrapper $isHovered={isHovered}>
          <MainText>Add Your Story</MainText>
          <SubText $isHovered={isHovered}>Share & Heal</SubText>
        </TextWrapper>
      </FABContent>

      <RippleEffect $isHovered={isHovered} />
    </FABContainer>
  );
};

export default FloatingStoryButton;
