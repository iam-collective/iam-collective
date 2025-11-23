import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TopNav = styled.nav<{ $variant: string }>`
  ${(props) =>
    props.$variant.toLowerCase().includes('home') &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 2rem;
  `}
  height: 70px;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

export const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #d31875 0%, #2e86ab 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

export const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  background: ${(props) => (props.$isOpen ? '#d31875' : 'transparent')};
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  color: ${(props) => (props.$isOpen ? 'white' : '#2d3748')};

  &:hover {
    background: ${(props) => (props.$isOpen ? '#b01560' : '#f7fafc')};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  backdrop-filter: blur(4px);
`;

export const SlideMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background: white;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 1002;
  transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
`;

export const MenuHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #fafafa 0%, #f0f4f8 100%);
`;

export const MenuTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #d31875;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    color: #d31875;
  }
`;

export const MenuItems = styled.div`
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
`;

export const MenuItem = styled.button<{ $isActive: boolean; $isClickable: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${(props) =>
    props.$isActive ? 'linear-gradient(90deg, #fff5f7 0%, #f0f9ff 100%)' : 'transparent'};
  border: none;
  cursor: ${(props) => (props.$isClickable ? 'pointer' : 'default')};
  transition: all 0.3s ease;
  position: relative;
  text-align: left;
  border-left: 4px solid ${(props) => (props.$isActive ? '#d31875' : 'transparent')};

  &:hover {
    background: ${(props) =>
      props.$isClickable ? 'linear-gradient(90deg, #fafafa 0%, #f8f9fa 100%)' : 'transparent'};
    transform: ${(props) => (props.$isClickable ? 'translateX(4px)' : 'none')};
  }

  &:active {
    transform: ${(props) => (props.$isClickable ? 'translateX(2px)' : 'none')};
  }
`;

export const MenuItemIcon = styled.div<{ $isActive: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border-radius: 10px;
  background: ${(props) => (props.$isActive ? '#d31875' : '#f7fafc')};
  color: ${(props) => (props.$isActive ? 'white' : '#4a5568')};
  transition: all 0.3s ease;

  ${MenuItem}:hover & {
    background: ${(props) => (props.$isActive ? '#d31875' : '#e2e8f0')};
    transform: scale(1.05);
  }
`;

export const MenuItemLabel = styled.span<{ $isActive: boolean }>`
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  color: ${(props) => (props.$isActive ? '#d31875' : '#2d3748')};
  transition: color 0.3s ease;

  ${MenuItem}:hover & {
    color: #d31875;
  }
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  right: 1.5rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d31875;
  animation: ${fadeIn} 0.3s ease;
`;

export const MenuFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  background: #fafafa;
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #718096;
  text-align: center;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
`;
