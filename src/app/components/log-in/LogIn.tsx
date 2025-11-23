
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
import { TitleUnderline } from '../sign-up/SignUp.styles';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loginUser = useMutation(api.usersInfo.loginUser);

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
      const result = await loginUser({ email: email.trim(), password });
      const isPasswordValid = await bcrypt.compare(password, result.hashedPassword);

      if (!isPasswordValid) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          userId: result.user._id,
          email: result.user.email,
          fullName: result.user.full_name,
        })
      );

      login({ email: result.user.email, fullName: result.user.full_name });
      navigate('/home');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Login</FormTitle>
        <TitleUnderline />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleLogin}>
          <Label>Email *</Label>
          <TextInput
            type="email"
            placeholder="Enter your email"
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
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            disabled={isLoading}
            required
          />

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>

          <ForgotPassword
            href="#"
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
