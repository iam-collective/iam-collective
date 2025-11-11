import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f3e1ff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #e6ccff, #f3e1ff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle, #d8b4fe, #e9d5ff, #f3e1ff);
    opacity: 0.3;
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    height: 200px;
    &::before {
      display: none;
    }
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #6a0dad; 
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #7b1fa2; 
  margin-bottom: 0.25rem;
`;

export const TextInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #cba6f7;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827;
  outline: none;

  &:focus {
    border-color: #9b30ff;
    box-shadow: 0 0 0 2px rgba(155, 48, 255, 0.2);
  }
`;

export const SelectInput = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #cba6f7;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827;
  outline: none;

  &:focus {
    border-color: #9b30ff;
    box-shadow: 0 0 0 2px rgba(155, 48, 255, 0.2);
  }
`;

export const SubmitButton = styled.button`
  background-color: #9b30ff;
  color: white;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7b1fa2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
