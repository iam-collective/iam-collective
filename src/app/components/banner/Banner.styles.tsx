import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const OverlayText = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
`;

export const Quote = styled.p<{ $animate: boolean }>`
  color: white;
  font-size: 1.4rem;
  font-family: 'Georgia', serif;
  font-weight: 500;
  animation: ${({ $animate }) => ($animate ? fadeIn : 'none')} 0.5s ease-in-out;
`;

export const Author = styled.p<{ $animate: boolean }>`
  color: #dcdcdc;
  margin-top: 0.4rem;
  font-style: italic;
  font-size: 0.85rem;
  animation: ${({ $animate }) => ($animate ? fadeIn : 'none')} 0.5s ease-in-out;
`;
