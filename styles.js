import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    width: 100%;
    display:flex;
    flex-direction:column;
  }

  header {
    box-shadow: 0px 0px 10px 0px hsla(0, 0%, 0%, 0.50);
    padding: 2rem;
  }

  main {
    display:flex;
    flex-direction:column;
    gap:2rem;
    padding: 2rem 0;
  }

  footer {
    
  }
`;
