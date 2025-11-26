/* eslint-disable */
import styled from 'styled-components';
import { PinkButton } from '../landing-page/LandingPage.styles'; // Reuse your PinkButton

export const Container = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  box-sizing: border-box;
  background: #f9f9f9;
`;

export const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  background: white;
  border-radius: 2rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%;
    height: 95vh;
    padding: 1.5rem;
  }

  font-family: 'Lora', serif; /* Ensure Lora is inherited */
`;

export const FormTitle = styled.h1`
  font-family: 'Lora', serif;
  font-size: 1.6rem;
  font-weight: 700; /* Use defined font-weight */
  color: #000000;
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

export const TitleUnderline = styled.div`
  height: 2px;
  width: 5%;
  background-color: rgb(255, 105, 180);
  margin: 8px 0 20px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  margin-top: 20px;
  width: 100%;
`;

export const Label = styled.label`
  font-family: 'Lora', serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

export const TextInput = styled.input`
  font-family: 'Lora', serif;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  font-size: 1rem;
  outline: none;
  background: #fafafa;

  &:focus {
    border-color: #d31875;
    box-shadow: 0 3px 10px rgba(211, 24, 117, 0.2);
  }
`;

export const ErrorMessage = styled.div`
  font-family: 'Lora', serif;
  color: #d32f2f;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const LoginButton = styled(PinkButton)`
  width: 100%;
  font-family: 'Lora', serif; /* Ensure Lora is applied */
  font-weight: 500; /* Match your @font-face medium */
`;

export const ForgotPassword = styled.a`
  font-family: 'Lora', serif;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #7b1fa2;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #6a0dad;
  }
`;
