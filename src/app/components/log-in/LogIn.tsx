/* eslint-disable */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ScreenContainer } from '../landing-page/LandingPage.styles';
import styled from 'styled-components';
import { PinkButton } from '../sign-up/SignUp.styles';
import { useAuth } from '../../context/AuthContext';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import bcrypt from 'bcryptjs';

const LeftDecor = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    height: 200px;
  }

  div {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, #ffd7e8, #ffe4ec);
    opacity: 0.3;
  }

  .circle1 {
    width: 180px;
    height: 180px;
    top: 10%;
    left: 5%;
  }

  .circle2 {
    width: 120px;
    height: 120px;
    bottom: 15%;
    right: 10%;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Convex mutation for login
  const loginUser = useMutation(api.usersInfo.loginUser);

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.5 } },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter valid email and password.');
      setIsLoading(false);
      return;
    }

    // // Create a temporary fake user (backend will replace this later)
    // const mockUser = {
    //   id: '1234',
    //   name: 'IAM User',
    //   email,
    //   token: 'mock_token_abc123',
    // };

    // login(mockUser); // Sets user + clears guest mode
    // navigate('/home'); // redirect

    try {
      // Call Convex login mutation
      const result = await loginUser({
        email: email.trim(),
        password,
      });

      // Verify password with bcrypt
      const isPasswordValid = await bcrypt.compare(password, result.hashedPassword);

      if (!isPasswordValid) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Store user info locally (optional)
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          userId: result.user._id,
          email: result.user.email,
          fullName: result.user.full_name,
        })
      );

      // Login via AuthContext
      login({
        email: result.user.email,
        fullName: result.user.full_name,
      });

      // Redirect to home
      navigate('/home');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <LeftDecor>
        <motion.div
          className='circle1'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className='circle2'
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 1.2 }}
        />
      </LeftDecor>

      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a' }}>Login</h1>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
        onSubmit={handleLogin}
      >
        <motion.div custom={0} initial='hidden' animate='visible' variants={inputVariants}>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(''); // Clear error on input change
            }}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #ffbfdc',
              outline: 'none',
              fontSize: '1rem',
            }}
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div custom={1} initial='hidden' animate='visible' variants={inputVariants}>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(''); // Clear error on input change
            }}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #ffbfdc',
              outline: 'none',
              fontSize: '1rem',
            }}
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div initial='hidden' animate='visible' variants={buttonVariants}>
          <PinkButton type='submit' style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </PinkButton>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <a
            href='#'
            style={{ fontSize: '0.85rem', color: '#6b7280', textDecoration: 'underline' }}
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement forgot password functionality
              alert('Password reset functionality coming soon!');
            }}
          >
            Forgot Password?
          </a>
        </motion.div>
      </form>
    </ScreenContainer>
  );
}
