import styled, { keyframes } from 'styled-components';

export const AboutContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  // background: linear-gradient(135deg, #f5ecff, #e8dbff);
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const AboutContent = styled.div`
  max-width: 800px;
  color: #2e004f;
`;

export const AboutTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #6a0dad;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const AboutText = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 1rem;
  color: #3a006f;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Highlight = styled.span`
  color: #9b30ff;
  font-weight: 600;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

export const PageWrapper = styled.div`
  padding: 3rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  color: #2d3748;
  background: linear-gradient(135deg, #fafafa 0%, #f0f4f8 100%);
  min-height: 100vh;
`;

export const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${float} 3s ease-in-out infinite;
`;

export const Logo = styled.img`
  width: 140px;
  filter: drop-shadow(0 4px 12px rgba(211, 24, 117, 0.2));
  animation: ${fadeIn} 0.8s ease;
`;

export const Section = styled.section`
  margin-bottom: 5rem;
  animation: ${fadeIn} 0.8s ease;
`;

export const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 2.2rem;
  margin: 0;
  color: #d31875;
  font-weight: 700;
  position: relative;
  display: inline-block;
`;

export const TitleAccent = styled.div`
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #a8d8ea, #ffb4a2);
  border-radius: 2px;
  margin-top: 0.5rem;
  animation: ${shimmer} 2s infinite;
  background-size: 200% 100%;
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  border: 1px solid rgba(168, 216, 234, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(168, 216, 234, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
    border-color: rgba(168, 216, 234, 0.4);
  }

  &:hover::before {
    left: 100%;
  }

  p {
    line-height: 1.8;
    font-size: 1.05rem;
    color: #4a5568;
    margin: 0;
  }
`;

export const FounderQuote = styled.blockquote`
  position: relative;
  background: linear-gradient(135deg, #fff5f7 0%, #f0f9ff 100%);
  border-radius: 16px;
  padding: 2rem 2rem 2rem 3rem;
  margin: 2rem 0 0 0;
  border-left: 5px solid #d31875;
  box-shadow: 0 2px 12px rgba(211, 24, 117, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(211, 24, 117, 0.15);
    transform: translateX(5px);
  }
`;

export const QuoteIcon = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 3rem;
  color: #d31875;
  opacity: 0.3;
  font-family: 'Lora', serif;
  line-height: 1;
`;

export const QuoteText = styled.p`
  font-style: italic;
  color: #2d3748;
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const CardGlow = styled.div<{ $color: string; $isHovered: boolean }>`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: ${(props) => props.$color};
  border-radius: 20px;
  opacity: ${(props) => (props.$isHovered ? 0.3 : 0)};
  filter: blur(12px);
  transition: opacity 0.4s ease;
  z-index: 0;
`;

export const TeamCard = styled.div<{ $isHovered: boolean; $color: string }>`
  position: relative;
  background: white;
  border-radius: 18px;
  padding: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  overflow: hidden;
  border: 2px solid ${(props) => (props.$isHovered ? props.$color : 'transparent')};

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;
export const ImageWrapper = styled.div<{ $isHovered: boolean }>`
  position: relative;
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.5s ease;
    transform: ${(props) => (props.$isHovered ? 'scale(1.05)' : 'scale(1)')};
  }
`;

export const ImageOverlay = styled.div<{ $isHovered: boolean; $color: string }>`
  position: absolute;
  inset: 0;
  background: ${(props) => props.$color};
  opacity: ${(props) => (props.$isHovered ? 0.2 : 0)};
  transition: opacity 0.4s ease;
  mix-blend-mode: multiply;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
`;

export const Name = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  color: #d31875;
  font-weight: 700;
  transition: color 0.3s ease;
`;

export const Role = styled.p`
  margin: 0 0 0.8rem 0;
  font-weight: 600;
  font-size: 0.95rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Bio = styled.p<{ $isHovered: boolean }>`
  margin: 0;
  line-height: 1.6;
  color: #4a5568;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  color: ${(props) => (props.$isHovered ? '#2d3748' : '#4a5568')};
`;

export const InteractiveCorner = styled.div<{ $color: string }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: ${(props) => props.$color};
  opacity: 0.15;
  border-radius: 18px 0 18px 0;
  transition: all 0.4s ease;

  ${TeamCard}:hover & {
    width: 80px;
    height: 80px;
    opacity: 0.25;
  }
`;

export const HighlightCard = styled(ContentCard)`
  background: linear-gradient(135deg, #fff5f7 0%, #f0f9ff 100%);
  border: 2px solid rgba(168, 216, 234, 0.3);

  p {
    font-size: 1.1rem;
    line-height: 1.9;
  }
`;

export const WordHighlight = styled.span`
  background: linear-gradient(120deg, #2e86ab 0%, #e63946 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(120deg, #2e86ab 0%, #e63946 100%);
    opacity: 0.4;
  }
`;

export const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 1s ease;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #d31875 0%, #2e86ab 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: #4a5568;
  margin: 0;
  font-weight: 400;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

export const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  strong {
    color: #2d3748;
    font-size: 1rem;
  }

  span {
    color: #718096;
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const ServiceCard = styled.div`
  background: white;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #a8d8ea, #ffb4a2, #ffcdb2);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    border-color: rgba(168, 216, 234, 0.3);
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const ServiceIconWrapper = styled.div<{ $color: string }>`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;

  ${ServiceCard}:hover & {
    transform: rotate(5deg) scale(1.1);
    box-shadow: 0 8px 20px ${(props) => props.$color}40;
  }
`;

export const ServiceEmoji = styled.span`
  font-size: 2rem;
`;

export const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  color: #d31875;
  margin: 0 0 1rem 0;
  font-weight: 700;
`;

export const ServiceDescription = styled.p`
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
`;

export const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const ProcessCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #a8d8ea, #ffb4a2, #ffcdb2);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    border-color: rgba(168, 216, 234, 0.3);
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const ProcessNumber = styled.div<{ $color: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.$color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px ${(props) => props.$color}60;
  transition: all 0.4s ease;

  ${ProcessCard}:hover & {
    transform: scale(1.15) rotate(360deg);
  }
`;

export const ProcessIconWrapper = styled.div<{ $color: string }>`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;

  ${ProcessCard}:hover & {
    transform: rotate(5deg) scale(1.1);
    box-shadow: 0 8px 20px ${(props) => props.$color}40;
  }
`;

export const ProcessEmoji = styled.span`
  font-size: 2rem;
`;

export const ProcessTitle = styled.h3`
  font-size: 1.3rem;
  color: #d31875;
  margin: 0 0 1rem 0;
  font-weight: 700;
  padding-right: 3rem;
`;

export const ProcessDescription = styled.p`
  color: #4a5568;
  line-height: 1.7;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
`;

export const ProcessList = styled.ul`
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
  list-style: none;
`;

export const ProcessListItem = styled.li`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #d31875;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;
