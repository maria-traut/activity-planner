import styled from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`;

export const StyledFigure = styled.figure`
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 250px;
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export const StyledFigcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

export const StyledActivityHeadline = styled.h2`
  font-size: 1.25rem;
  line-height: 1.3;
  text-align: center;
`;

export const StyledCategoryList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
  flex-wrap: wrap;
`;

export const StyledCategoryTag = styled.li`
  display: inline-block;
  background-color: #e0f0ff;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.8rem;
`;
