import styled from "styled-components";

export const StyledToolbarWrap = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 1rem;
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
