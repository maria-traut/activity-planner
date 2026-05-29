import styled, { keyframes } from "styled-components";

export const FormButton = styled.button`
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

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    display:none;
  }
`;

export const FormStatus = styled.div`
  all: unset;
  border-radius: 10px;
  color: black;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
`;

export const FormError = styled(FormStatus)`
  border-color: transparent;
  color: red;
`;

export const FormSuccess = styled(FormStatus)`
  border-color: transparent;
  color: green;

  opacity: 1;
  animation: ${fadeOut} 1s ease forwards;
  animation-delay: 2s;
`;

export const TextError = styled.p`
  color: red;
`;

export const TextSuccess = styled.p`
  color: green;

  opacity: 1;
  animation: ${fadeOut} 1s ease forwards;
  animation-delay: 2s;
`;

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const FormButtonWrap = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

export const FormFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
