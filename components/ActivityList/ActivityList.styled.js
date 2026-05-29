import styled from "styled-components";

export const StyledActivityList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
