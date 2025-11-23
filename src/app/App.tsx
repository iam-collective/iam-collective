import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomeScreen from './components/home/HomePage';
import LearnScreen from './components/learn/Learn';
import Stories from './components/story/Stories';
import LandingPage from './components/landing-page/LandingPage';
import SignUpPage from './components/sign-up/SignUpPage';
import LoginPage from './components/log-in/LogIn';
import GuestHomePage from './components/guest-page/GuestHomePage';
import AboutPage from './components/about-page/AboutPage';
import ProfilePage from './components/profile-page/ProfilePage';
import ContinuePage from './components/continue/ContinuePage';
import MicroLessons from './components/micro-lessons/MicroLessons';
import { Toaster } from 'sonner';
import { GlobalStyles } from './Global.styles';
import StorieSection from './components/story/StorieSection';
import StoriesLayout from './components/story/StoriesLayout';
import LogIn from './components/log-in/LogIn';
import MyStories from './components/story/MyStories';

const App: React.FC = () => (
  <AuthProvider>
    <Toaster />
    <GlobalStyles />
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/continue' element={<ContinuePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/guest-home' element={<GuestHomePage />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/learn' element={<LearnScreen />} />
        <Route path='/micro-lessons' element={<MicroLessons />} />
        <Route path='/heal' element={<Stories />} />
        <Route path='/stories' element={<StoriesLayout />}>
          <Route index element={<Stories />} />
          <Route path='my-stories' element={<MyStories />} />
          <Route path=':storyId' element={<StorieSection />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
