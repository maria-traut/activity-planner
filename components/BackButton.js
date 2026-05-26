import Link from "next/link";
import styled from "styled-components";
export default function BackButton() {
  return <StyledLink href="/">&#8619; Return</StyledLink>;
}

const StyledLink = styled(Link)`
  margin: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
