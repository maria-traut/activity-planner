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
    background-color: var(--main-200);
`;

export const StyledCardImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: var(--card-image-height);
`;

export const StyledCardImage = styled(Image)`
    object-fit: cover;
`;

export const StyledFigcaption = styled.figcaption`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    gap: var(--spacing-small);

    padding: var(--spacing-small);
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
    gap: var(--spacing-local-small);
`;

export const StyledCategoryTag = styled.li`
    display: inline-block;
    background-color: var(--gray-300);
    border-radius: 20px;
    line-height: 1;
    padding: 4px 8px;
    @media (prefers-color-scheme: dark) {
        background-color: var(--gray-800);
    }
`;
