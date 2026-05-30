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

  input[type="text"], input[type="password"], textarea {
    all:unset;
    box-shadow: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 1px solid black;
    font-size: inherit;
    line-height: inherit;
  }

  textarea {
    resize: vertical;
    min-height:4rem;
    max-height:12rem;
  }

  select {
    box-shadow: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 1px solid black;
    font-size: inherit;
    line-height: inherit;
  }

  select[multiple] {
    padding: 0.2rem 0rem;

    option:hover {
      background-color:#eee;
    }
  }

  option {
    padding: 0.3rem 1rem;
    max-width:100%;
  }

  label {
    cursor:pointer;
  }

`;
