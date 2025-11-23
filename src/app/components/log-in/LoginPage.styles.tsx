
/* eslint-disable */
import styled from 'styled-components';
import { PinkButton } from '../sign-up/SignUp.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

export const FormWrapper = styled.div`
  width: 100%;
  width: 100%;        
  height: 90vh;               
  background: white;
  border-color: red;
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
`;

export const TitleUnderline = styled.div`
  height: 2px;
  width: 5%;
  background-color: rgb(255, 105, 180);
  margin: 8px 0 20px 0;
`;

export const FormTitle = styled.h1`
  font-family: 'Lora', serif; 
  font-size: 1.6rem;          
  font-weight: 600;          
  color: #fffff;           
  margin: 0 0 1.5rem 0;   
  text-align: center;                
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  margin-top: 20px;
   
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

export const TextInput = styled.input`
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
  color: #d32f2f;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const LoginButton = styled(PinkButton)`
  width: 100%;
`;

export const ForgotPassword = styled.a`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #7b1fa2;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #6a0dad;
  }
`;
