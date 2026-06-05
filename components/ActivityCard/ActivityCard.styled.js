import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:visited {
        color: inherit;
    }
`;

export const StyledFigure = styled.figure`
    width: 100%;
    margin: 0;
    height: 100%;
    /* background-color: var(--main-200); */
`;

export const StyledCardImageWrapper = styled.div`
    position: relative;

    height: 160px; /*note: this still adheres to the 8pt grid system, keep in mind when adapting */
`;

export const StyledCardImage = styled(Image)`
    object-fit: cover;
`;

export const StyledFigcaption = styled.figcaption`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--eight-grid__halfstep);

    padding: var(--eight-grid__halfstep);
`;

export const StyledActivityHeadline = styled.h2`
    text-align: left;
    margin: 0;
    font-size: var(--text-font-size-normal);
`;

export const StyledCategoryList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: flex-start;

    padding: 0;
    flex-wrap: wrap;

    font-size: var(--text-font-size-small);
    gap: var(--eight-grid__halfstep);
`;

export const StyledCategoryTag = styled.li`
    display: inline-block;

    background-color: ${({ $categoryColor }) =>
        $categoryColor || "var(--gray-200)"};
    border-radius: var(--border-radius-rounded);
    padding: var(--eight-grid__halfstep) var(--eight-grid__s);

    @media (prefers-color-scheme: dark) {
        background-color: ${({ $categoryColor }) =>
            $categoryColor || "var(--gray-800)"};
    }
`;
