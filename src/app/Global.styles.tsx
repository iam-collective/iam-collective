import { createGlobalStyle } from 'styled-components';
import LoraRegular from './assets/fonts/Lora-Regular.ttf';
import LoraMedium from './assets/fonts/Lora-Medium.ttf';
import LoraBold from './assets/fonts/Lora-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
  /* Load Lora fonts */
  @font-face {
    font-family: 'Lora';
    src: url(${LoraRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Lora';
    src: url(${LoraMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Lora';
    src: url(${LoraBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  /* CSS Variables */
  :root {
    --primary-colour: #d31875;
    --background-color: #f7fafc;
    --primary-text-colour: #2d3748;
    --danger-color: #e53e3e;
  }

  /* Global reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Lora', serif !important;
    font-weight: 400;
    background-color: var(--background-color);
    color: var(--primary-text-colour);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Lora', serif !important;
    font-weight: 700;
    line-height: 1.2;
  }

  p, span, div, button, a, li {
    font-family: 'Lora', serif !important;
    font-weight: 400;
  }
`;
