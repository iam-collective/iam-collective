import React from 'react';
import { GraduationCap, Heart, Home, Fan, Book } from 'lucide-react';
import { BottomNav, HomeIndicator } from '../home/HomePage.styled';
import { useNavigate } from 'react-router-dom';

// import { BottomNavContainer, NavItem, NavIcon, NavLabel } from "./BottomNav.styled";

interface BottomNavProps {
  activeItem?: string;
}

const BottomNavigation: React.FC<BottomNavProps> = ({ activeItem }) => {
  const navigate = useNavigate();

  const handleNavigate = (navigateTo: string): void => {
    navigate(navigateTo);
  };

  const TooltipItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {children}
      <span
        style={{
          visibility: 'hidden',
          opacity: 0,
          transition: 'opacity 0.2s',
          position: 'absolute',
          bottom: '36px',
          backgroundColor: 'rgba(0,0,0,0.75)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 12,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
        className='tooltip-text'
      >
        {label}
      </span>
    </div>
  );

  return (
    <>
      <BottomNav>
        <TooltipItem label='Learn'>
          <GraduationCap
            size={24}
            opacity={0.4}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNavigate('/quotes')}
          />
        </TooltipItem>

        <TooltipItem label='Heal'>
          <Heart size={24} opacity={0.4} />
        </TooltipItem>

        <TooltipItem label='Home'>
          <HomeIndicator>
            <Home
              size={28}
              color='#d31875'
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavigate('/')}
            />
          </HomeIndicator>
        </TooltipItem>

        <TooltipItem label='About'>
          <Fan size={24} opacity={0.4} />
        </TooltipItem>

        <TooltipItem label='Share'>
          <Book
            size={24}
            opacity={0.4}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNavigate('/stories')}
          />
        </TooltipItem>
      </BottomNav>
      <div></div>
    </>
  );
};

export default BottomNavigation;
