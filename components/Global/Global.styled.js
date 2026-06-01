import styled, { keyframes } from "styled-components";

export const KeyframesFadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    display:none;
  }
`;

export const StyledToolbarWrap = styled.section`
    padding: 0 1rem;
`;

export const StyledToolbar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
`;

export const StyledButton = styled.button`
    all: unset;
    border-radius: 10px;
    color: black;
    border: 1px solid black;
    background: white;
    padding: 0.5em 1em;
    cursor: pointer;

    &:hover {
        background: #eee;
    }

    &:disabled {
        cursor: not-allowed;
        border-color: gray;
        color: gray;
    }
`;

export const StyledButtonRed = styled(StyledButton)`
    color: red;
    border-color: red;
`;

export const StyledButtonGreen = styled(StyledButton)`
    color: green;
    border-color: green;

    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;
`;

export const StyledStatusMessageWrap = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 1rem;
    align-items: center;
`;

export const StyledStatusMessage = styled.p`
    color: inherit;
    padding: 0.5em 0em;
    margin: 0;
`;

export const StyledStatusMessageSuccess = styled(StyledStatusMessage)`
    color: green;
    border-color: transparent;

    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;
`;

export const StyledStatusMessageError = styled(StyledStatusMessage)`
    color: red;
    border-color: transparent;
`;
