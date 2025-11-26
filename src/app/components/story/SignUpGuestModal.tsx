import React from 'react';
import { PinkButton, StyledPopUpCard } from './NoStoriesPage.styles';
import { useNavigate } from 'react-router-dom';
type GuestModalProps = {
  closeModal: () => void;
};
const SignUpGuestModal: React.FC<GuestModalProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  function navigateToSignUp() {
    navigate('/signup');
  }
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.35)',
          zIndex: 10,
        }}
        onClick={closeModal}
      />
      <StyledPopUpCard>
        <h3 style={{ fontFamily: 'Work Sans' }}>Sign Up to Share Stories</h3>
        <p>Your words can inspire others. Create an account to unlock full access.</p>
        <PinkButton onClick={navigateToSignUp}>Sign Up</PinkButton>
        <PinkButton onClick={closeModal} style={{ backgroundColor: '#ffd7e8', marginLeft: '1rem' }}>
          Cancel
        </PinkButton>
      </StyledPopUpCard>
    </>
  );
};

export default SignUpGuestModal;
