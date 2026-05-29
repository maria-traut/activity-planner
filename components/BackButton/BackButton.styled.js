import styled from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
  margin: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
