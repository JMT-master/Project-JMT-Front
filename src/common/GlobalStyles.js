import { createGlobalStyle} from "styled-components"
//포크함
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 1s linear;
  }
  `