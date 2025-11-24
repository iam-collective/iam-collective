import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
    --primary-colour: #d31875;
    --background-color: #f7fafc;
    --primary-text-colour: #2d3748;
    --danger-color: #e53e3e;
  }
   body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lora', serif;
   } 
`;
