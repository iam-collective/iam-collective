import React from 'react';
import { HeaderContainer, Frame, ProfileImage } from './Header.style';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }): React.ReactElement => {
  return (
    <HeaderContainer>
      <Frame>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontFamily: 'Work Sans', margin: 0, fontSize: 40 }}>{title}</h1>
          <div
            style={{ height: '2px', width: '190%', backgroundColor: '#ff69b4', marginTop: '8px' }}
          ></div>
        </div>

        <ProfileImage src='https://randomuser.me/api/portraits/women/44.jpg' alt='Profile' />
      </Frame>
    </HeaderContainer>
  );
};

export default Header;
