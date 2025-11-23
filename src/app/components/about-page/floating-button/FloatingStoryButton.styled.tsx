import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const particleFloat = keyframes`
  0% {
    transform: translateY(0) translateX(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-30px) translateX(10px) scale(1);
    opacity: 0;
  }
`;

export const FABContainer = styled.button<{ $isHovered: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #d31875 0%, #e63946 50%, #ff6b9d 100%);
  border: none;
  border-radius: ${(props) => (props.$isHovered ? '60px' : '50%')};
  padding: ${(props) => (props.$isHovered ? '0.75rem 1.25rem' : '0.75rem')};
  width: ${(props) => (props.$isHovered ? 'auto' : '60px')};
  height: 60px;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(211, 24, 117, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${float} 3s ease-in-out infinite;
  overflow: hidden;

  &:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow: 0 10px 40px rgba(211, 24, 117, 0.6);
    width: auto;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: ${(props) => (props.$isHovered ? 'auto' : '56px')};
    height: 56px;
  }
`;

export const GlowEffect = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(135deg, #d31875, #e63946, #ff6b9d, #d31875);
  background-size: 300% 300%;
  border-radius: 60px;
  opacity: ${(props) => (props.$isHovered ? 0.6 : 0.3)};
  filter: blur(12px);
  z-index: -1;
  animation: ${shimmer} 3s ease infinite;
  transition: opacity 0.3s ease;
`;

export const ParticleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export const Particle = styled.div<{ $delay: number }>`
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: ${particleFloat} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
  opacity: 0;

  ${FABContainer}:hover & {
    animation-play-state: running;
  }
`;

export const FABContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
`;

export const IconWrapper = styled.div<{ $isHovered: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.4s ease;
  flex-shrink: 0;

  ${FABContainer}:hover & {
    transform: rotate(15deg) scale(1.1);
  }
`;

export const TextWrapper = styled.div<{ $isHovered: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  max-width: ${(props) => (props.$isHovered ? '200px' : '0')};
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  white-space: nowrap;
`;

export const MainText = styled.span`
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const SubText = styled.span<{ $isHovered: boolean }>`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.7rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
`;

export const SparkleIcon = styled.div<{ $isHovered: boolean }>`
  color: white;
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  max-width: ${(props) => (props.$isHovered ? '24px' : '0')};
  animation: ${(props) => (props.$isHovered ? rotate : 'none')} 2s linear infinite;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

export const RippleEffect = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 60px;
  border: 3px solid white;
  opacity: 0;
`;
