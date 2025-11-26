/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import bcrypt from 'bcryptjs';

import {
  Container,
  FormWrapper,
  FormTitle,
  Form,
  Label,
  TextInput,
  ErrorMessage,
  LoginButton,
  ForgotPassword,
} from './LoginPage.styles';
import { CuteBackButton, TitleUnderline } from '../sign-up/SignUp.styles';
import { BackButton, InlineBackButton, SuggestedTitle } from '../story/Stories.style';

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

  // ✅ Restore user from localStorage when page loads
  React.useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      const parsed = JSON.parse(saved);
  
      login({
        email: parsed.email,
        fullName: parsed.fullName,
      });
    }
  }, []);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter valid email and password.');
      setIsLoading(false);
      return;
    }

    try {
      // Call Convex login mutation
      const result = await loginUser({ 
        email: email.trim(), 
        password 
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
    <Container>
      <FormWrapper>
      <CuteBackButton type='button' onClick={() => navigate(-1)}>
          ←
        </CuteBackButton>

          <FormTitle>Login</FormTitle>
        

        <TitleUnderline />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleLogin}>
          <Label>Email *</Label>
          <TextInput
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
            required
          />

          <Label>Password *</Label>
          <TextInput
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
            required
          />

          <LoginButton type='submit' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>

          <ForgotPassword
            href='#'
            onClick={(e) => {
              e.preventDefault();
              alert('Password reset functionality coming soon!');
            }}
          >
            Forgot Password?
          </ForgotPassword>
        </Form>
      </FormWrapper>
    </Container>
   );
}