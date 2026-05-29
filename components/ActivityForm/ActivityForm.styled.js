import styled, { keyframes } from "styled-components";

export const StyledFormButton = styled.button`
  all: unset;
  border-radius: 10px;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    border-color: gray;
    color: gray;
  }
`;

export const KeyframesFadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    display:none;
  }
`;

export const StyledFormStatus = styled.div`
  all: unset;
  border-radius: 10px;
  color: black;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
`;

export const StyledFormError = styled(StyledFormStatus)`
  border-color: transparent;
  color: red;
`;

export const StyledFormSuccess = styled(StyledFormStatus)`
  border-color: transparent;
  color: green;

  opacity: 1;
  animation: ${KeyframesFadeOut} 1s ease forwards;
  animation-delay: 2s;
`;

export const StyledTextError = styled.p`
  color: red;
`;

export const StyledTextSuccess = styled.p`
  color: green;

  opacity: 1;
  animation: ${KeyframesFadeOut} 1s ease forwards;
  animation-delay: 2s;
`;

export const StyledFormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const StyledFormFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
