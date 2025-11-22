import React from "react"
import BottomNavigation from "../bottom-nav/BottomNav";
import { ScreenContainer } from './StoriesCard.style'
import { Outlet } from "react-router-dom";
import Header from "../micro-lessons/Header";
const StoriesLayout: React.FC = () => {
    return (
        <ScreenContainer>
            <Header title="Stories" />
            <Outlet />
            <BottomNavigation />
        </ScreenContainer>

    )
};

export default StoriesLayout;
