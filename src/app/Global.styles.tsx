import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Lora Local Fonts */
  @font-face {
    font-family: 'Lora';
    src: url('./assets/fonts/Lora-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Lora';
    src: url('./assets/fonts/Lora-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Lora';
    src: url('./assets/fonts/Lora-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  :root {
    --primary-colour: #d31875;
    --background-color: #f7fafc;
    --primary-text-colour: #2d3748;
    --danger-color: #e53e3e;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lora', serif;
  }
`;
