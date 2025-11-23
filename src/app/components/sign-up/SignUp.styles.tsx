/* eslint-disable */
import styled from 'styled-components';

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
  justify-content: flex-start;
  margin: 0 auto;            
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%;
    height: 95vh;
    padding: 1.5rem;
  }
`;



export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 1rem; 
`;


export const TitleUnderline = styled.div`
  height: 2px;
  width: 100%;
  background-color: rgb(255, 105, 180);
  margin: 4px 0 0 0;
`;

export const FormTitle = styled.h1`
  font-family: 'Lora', serif; 
  font-size: 1.6rem;          
  font-weight: 600;          
  color: #fffff;           
  margin: 0;                  
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
`;

export const Label = styled.label<{ isRequired?: boolean }>`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
  position: relative;

  /* Add red star for required fields */
  &::after {
    content: '${({ isRequired }) => (isRequired ? '*' : '')}';
    color: red;
    margin-left: 0.25rem;
  }
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

export const SelectInput = styled.select`
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

export const StepNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const PinkButton = styled.button`
  background-color: #ffd7e8;
  color: #1a1a1a;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Lora', serif;

  &:hover {
    background-color: #ffbfdc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
export const CountrySelectWrapper = styled.div`
  position: relative;
`;

export const CountryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

export const CountryOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }

  img {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
  }
`;

export const CountrySelectorButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    border-color: #d31875;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  img {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
  }
`;

