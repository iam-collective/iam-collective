import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #f3e1ff, #ffe4ec);
  text-align: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #6a0dad;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #7b1fa2; 
  margin-top: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 22rem;
`;

export const OptionCard = styled.button`
  background: linear-gradient(to right, #fff0f6, #f6e6ff);
  border: 1px solid rgba(155, 48, 255, 0.15);
  border-radius: 1rem;
  padding: 1.25rem;
  text-align: left;
  box-shadow: 0 4px 14px rgba(155, 48, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(to right, #ffe4ec, #e6ccff);
    box-shadow: 0 6px 20px rgba(123, 31, 162, 0.25);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const OptionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #7b1fa2; 
  margin-bottom: 0.25rem;
`;

export const OptionText = styled.p`
  font-size: 0.95rem;
  color: #9b30ff;
`;

export const Footer = styled.p`
  margin-top: 3rem;
  font-size: 0.8rem;
  color: #6a0dad;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
