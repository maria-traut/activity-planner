import styled from "styled-components";
import Image from "next/image";

export const StyledActivityInfoContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-normal);
`;

export const StyledImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: var(--detail-image-height);
`;

export const StyledImage = styled(Image)`
    height: auto;
    object-fit: cover;
`;

export const StyledImageLayerTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--spacing-normal);
    z-index: 2;
`;

export const StyledImageLayerBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: var(--spacing-normal);
    z-index: 1;
`;

export const StyledActivityDetailTitle = styled.h2`
    box-shadow: var(--detail-headline-box-shadow-large);
    background-color: var(--detail-headline-background-color);
    display: table;
    padding: var(--spacing-small) var(--spacing-normal);
    border-radius: var(--border-radius-rounded);
`;

const StyledTagList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

    font-size: var(--text-font-size-small);
    gap: var(--spacing-local-normal);
`;

export const StyledTagElement = styled.li`
    text-align: center;
    border-radius: var(--border-radius-rounded);
    padding: var(--spacing-local-small) var(--spacing-local-normal);
    background-color: ${({ $categoryColor }) =>
        $categoryColor || "var(--gray-200)"};

    @media (prefers-color-scheme: dark) {
        background-color: ${({ $categoryColor }) =>
            $categoryColor || "var(--gray-800)"};
    }
`;

export const StyledLocations = styled(StyledTagList)``;

export const StyledCategories = styled(StyledTagList)``;

export const StyledActivityDetailDescriptionWrap = styled.div`
    padding: 0 var(--spacing-normal);

    article {
        max-width: 80ch;
        p {
            white-space: pre-line;
        }
    }
`;
