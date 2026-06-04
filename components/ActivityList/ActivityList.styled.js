import styled from "styled-components";

export const StyledActivityList = styled.ul`
    list-style: none;
    display: grid;
    gap: var(--eight-grid__normal);
    padding: var(--eight-grid__normal);
    margin: 0;

    grid-template-columns: repeat(2, 1fr);
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const StyledActivityCardContainer = styled.div`
    position: relative;
    height: 100%;
`;
