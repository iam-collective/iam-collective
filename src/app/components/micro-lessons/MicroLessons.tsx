import React from 'react';
import { ScreenContainer } from '../home/HomePage.styled';
import * as S from './MicroLessons.styles';
import Header from './Header';
import ProgressBar from './ProgressBar';
import Cards from './Cards';
import BottomNavigation from '../bottom-nav/BottomNav';
import { useHasHydrated, useModalCompletedDay } from '../../hooks/modal-hook';
import SideNavigation from '../bottom-nav/SideNav';
const MicroLessons: React.FC = () => {
  const hasHydrated = useHasHydrated();
  const complatedDay = useModalCompletedDay();
  if (!hasHydrated) return;
  return (
    <S.ScreenContainer>
      <SideNavigation title='Micro Lessons' variant='learn' />
      <S.Container>
        <S.Title>
          Learn.<span> </span> Heal.<span> </span> Act
        </S.Title>
        <ProgressBar />
        <S.Title>{complatedDay} of 16 days completed</S.Title>
        <Cards />
      </S.Container>
    </S.ScreenContainer>
  );
};

export default MicroLessons;
