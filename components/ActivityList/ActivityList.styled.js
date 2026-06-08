import styled from "styled-components";

export const StyledActivityList = styled.ul`
    list-style: none;

    padding: var(--eight-grid__normal);
    margin: 0;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 16px;
    gap: 16px;

    > li {
        grid-row: span 8;
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const StyledActivityCardContainer = styled.div`
    position: relative;
`;
