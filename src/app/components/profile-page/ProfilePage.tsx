/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { ArrowLeft } from 'lucide-react';
import {
  ProfileContainer,
  Header,
  Title,
  Avatar,
  NoUserContainer,
  SignUpButton,
} from './ProfilePage.styles';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserId(parsed.userId);
    }
  }, []);

  const handleSignUP = () => {
    navigate('/signup');
  };

  const user = useQuery(api.usersInfo.getUserById, userId ? { userId } : 'skip');

  if (!userId)
    return (
      <NoUserContainer>
        <Header>
          <ArrowLeft size={20} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
          <Title>Edit Profile</Title>
        </Header>
        <Avatar
          as='svg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          className='rounded-full bg-gray-200 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='12' cy='8' r='4' fill='currentColor' />
          <path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='currentColor' />
        </Avatar>
        <Title>No user data found. Please sign up first.</Title>
        <SignUpButton onClick={handleSignUP}>Sign Up</SignUpButton>
      </NoUserContainer>
    );
  if (!user)
    return (
      <NoUserContainer>
        <Header>
          <ArrowLeft
            size={20}
            onClick={() => navigate('/guest-home')}
            style={{ cursor: 'pointer' }}
          />
          <Title>Edit Profile</Title>
        </Header>
        <Avatar
          as='svg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          className='rounded-full bg-gray-200 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='12' cy='8' r='4' fill='currentColor' />
          <path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='currentColor' />
        </Avatar>
        <Title>No user data found. Please sign up first.</Title>
        <SignUpButton onClick={handleSignUP}>Sign Up</SignUpButton>
      </NoUserContainer>
    );

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    logout();
    navigate('/');
  };

  return (
    <ProfileContainer>
      <Header>
        <ArrowLeft size={20} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
        <Title>Edit Profile</Title>
      </Header>

      <Avatar
        as='svg'
        width='40'
        height='40'
        viewBox='0 0 24 24'
        className='rounded-full bg-gray-200 text-gray-400'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='12' cy='8' r='4' fill='currentColor' />
        <path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='currentColor' />
      </Avatar>

      <p>
        <strong>Name:</strong> {user.full_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Country:</strong> {user.country}
      </p>
      <p>
        <strong>Device:</strong> {user.device_type}
      </p>
      <p>
        <strong>Healing Journey:</strong> {user.healing_Journey}
      </p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          background: '#ff4e78',
          border: 'none',
          color: 'white',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Log Out
      </button>
    </ProfileContainer>
  );
}
