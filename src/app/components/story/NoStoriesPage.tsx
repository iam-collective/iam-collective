import React from 'react';
import * as S from './NoStoriesPage.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
type NoStoriesPageProps = {
    showModal: () => void;
    closeModal: () => void;
    showGuest: () => void;
    isGuest: boolean;
};
const NoStoriesPage: React.FC<NoStoriesPageProps> = ({ showModal, showGuest, closeModal }) => {
    const { isAuthenticated, isGuest } = useAuth()
    

    const handleAddStoryClick = () => {
        if (isGuest && !isAuthenticated) {
            // setShowGuestModal(true);
            showGuest()
        } else {
            showModal()
        }
    };
    console.log('isGuest in NoStoriesPage:', isGuest);
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: "24px" }}>
            <S.StyledContainer style={{ background: "linear-gradient(180deg, #FAF0E6 0%, #FDEDF4 100%)", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "purple", marginBottom: "0.5rem", fontFamily: "Lora" }}>Share your story</h1>
                <p style={{ fontSize: "1.5rem", maxWidth: "320px", color: "#6b6b6b", marginBottom: "2rem" }}>
                    Your words can inspire someone. Tell us about a moment, a feeling, or something you learned.
                </p>
                <S.PinkButton onClick={handleAddStoryClick}>
                    Add a Story
                </S.PinkButton>

                
            </S.StyledContainer>
        </div>
    )
};

export default NoStoriesPage;
