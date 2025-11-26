/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Heart, Home, Fan, Book, Menu, X, AlertCircle } from 'lucide-react';
import {
  TopNav,
  NavContainer,
  LeftSection,
  Logo,
  LogoText,
  HamburgerButton,
  Overlay,
  SlideMenu,
  MenuHeader,
  MenuTitle,
  CloseButton,
  MenuItems,
  MenuItem,
  MenuItemIcon,
  MenuItemLabel,
  ActiveIndicator,
  MenuFooter,
  FooterText,
  PageTitle,
} from './SideNav.styled';
import Header from '../micro-lessons/Header';
import { Title } from '../micro-lessons/Header.styles';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  path?: string;
  isHome?: boolean;
}

interface SideNavigationProps {
  title?: string;
  variant?: string;
}

const SideNavigation: React.FC = ({ title, variant }: SideNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const savedUser = localStorage.getItem("currentUser");
  const isGuestUser = !savedUser || savedUser === "null";

  const navItems: NavItem[] = [
    { label: 'Home', icon: Home, path: isGuestUser ? '/guest-home' : '/home', isHome: true},
    { label: 'Learn', icon: GraduationCap, path: '/learn' },
    { label: 'Stories', icon: Book, path: '/stories' },
    { label: 'About', icon: AlertCircle, path: '/about' },
  ];

  const handleNavigate = (path: string) => {
    if (path === '/home' && isGuestUser) {
      navigate('/guest-home');
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TopNav $variant={variant}>
        <NavContainer>
          <LeftSection>
            <HamburgerButton onClick={toggleMenu} $isOpen={isOpen}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </HamburgerButton>
            <Title>{title}</Title>
          </LeftSection>
          <Header title='' />
        </NavContainer>
      </TopNav>

      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <SlideMenu $isOpen={isOpen}>
        <MenuHeader>
          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={24} />
          </CloseButton>
        </MenuHeader>

        <MenuItems>
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = path ? location.pathname.startsWith(path) : false;
            const isClickable = !!path;

            return (
              <MenuItem
                key={label}
                onClick={() => isClickable && path && handleNavigate(path)}
                $isActive={isActive}
                $isClickable={isClickable}
              >
                <MenuItemIcon $isActive={isActive}>
                  <Icon size={22} />
                </MenuItemIcon>
                <MenuItemLabel $isActive={isActive}>{label}</MenuItemLabel>
                {isActive && <ActiveIndicator />}
              </MenuItem>
            );
          })}
        </MenuItems>

        <MenuFooter>
          <FooterText>© 2025 I Am Collective</FooterText>
        </MenuFooter>
      </SlideMenu>
    </>
  );
};

export default SideNavigation;
