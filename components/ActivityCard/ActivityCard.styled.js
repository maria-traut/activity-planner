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
    border-radius: var(--border-radius-small);
    box-shadow: var(--box-shadow-normal);
    width: 100%;
    margin: 0;
    height: 100%;
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
    align-items: center;
    gap: var(--spacing-normal);
    padding: var(--spacing-normal);
`;

export const StyledActivityHeadline = styled.h2`
    text-align: center;
    margin: 0;
`;

export const StyledCategoryList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    flex-wrap: wrap;

    font-size: var(--text-font-size-small);
    gap: var(--spacing-local-normal);
`;

export const StyledCategoryTag = styled.li`
    display: inline-block;
    background-color: var(--gray-200);
    border-radius: 999px;
    padding: var(--spacing-local-small) var(--spacing-local-normal);

    @media (prefers-color-scheme: dark) {
        background-color: var(--gray-800);
    }
`;
