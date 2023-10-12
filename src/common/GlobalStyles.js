import { createGlobalStyle} from "styled-components"
//풀 리퀘스트 테스트 2222
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 1s linear;
  }
  `