import styled from "styled-components";

export const StyledButton = styled.button`
  all: unset;
  border-radius: 10px;
  color: black;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
`;

export const StyledBaseButton = styled.button`
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

export const StyledDeleteButton = styled(StyledBaseButton)`
  color: red;
  border-color: red;
`;

export const StyledConfirmButton = styled(StyledBaseButton)`
  color: red;
  border-color: red;
  &:disabled {
    color: black;
    border: 1px solid black;
  }
`;
