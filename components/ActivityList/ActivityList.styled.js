import styled from "styled-components";

export const StyledActivityList = styled.ul`
    list-style: none;
    display: grid;
    gap: var(--spacing-normal);
    padding: 0 var(--spacing-normal);
    margin: 0;
    grid-template-columns: repeat(2, 1fr);
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
