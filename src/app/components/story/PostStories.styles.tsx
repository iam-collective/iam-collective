import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  padding: 1rem;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 10;
`;

export const SuccessPopup = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: #4caf50;
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 2000;
  animation: fadeInOut 1.5s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -10px); }
    10% { opacity: 1; transform: translate(-50%, 0px); }
    90% { opacity: 1; }
    100% { opacity: 0; transform: translate(-50%, -10px); }
  }
`;


export const PopUpCard = styled.div`
  position: fixed;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90%, 400px);
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  h3 {
    margin: 0 0 1rem;
    font-family: 'Work Sans', sans-serif;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #ff69b4;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #ff69b4;
  }
`;

export const PreviewImage = styled.img`
  width: 90%;
  object-fit: cover;
  height: 10rem;
  margin-top: 10px;
  border-radius: 8px;
`;

export const SubmitButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  outline: none;
  border-radius: 8px;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  background-color: ${({ $loading }) => ($loading ? '#ccc' : '#ffbfdc')};
  font-weight: 600;
`;
export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 8px 0 12px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #ff69b4;
  border-radius: 8px;
  background: white;
  outline: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: 'Work Sans', sans-serif;
  appearance: none;

  /* This keeps the options inside the popup */
  max-height: 48px;
  overflow-y: auto;

  option {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const DropdownArrow = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.9rem;
  color: #ff69b4;
  opacity: 0.8;
`;
