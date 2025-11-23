import React, { useCallback } from 'react';
import * as S from './Header.styles';
import { useNavigate } from 'react-router-dom';
type HeaderProps = {
  title: string;
  $invert?: boolean;
};
const Header: React.FC<HeaderProps> = ({ title, $invert }) => {
  const navigate = useNavigate();
  const goToProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);
  return (
    <S.Header>
      {/* <S.Title>{title}</S.Title> */}
      <S.ProfileImage
        as='svg'
        width='40'
        height='40'
        viewBox='0 0 24 24'
        className='rounded-full bg-gray-200 text-gray-400'
        xmlns='http://www.w3.org/2000/svg'
        onClick={goToProfile}
        style={{ cursor: 'pointer' }}
        $invert={$invert}
      >
        <circle cx='12' cy='8' r='4' fill='currentColor' />
        <path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='currentColor' />
      </S.ProfileImage>
    </S.Header>
  );
};

export default Header;
