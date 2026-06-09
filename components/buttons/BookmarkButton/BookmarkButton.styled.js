import styled from "styled-components";

export const StyledBookmarkButton = styled.button`
    all: unset;
    position: absolute;
    top: var(--eight-grid__s);
    right: var(--eight-grid__halfstep);
    z-index: 2;
    cursor: pointer;

    svg {
        max-width: 80%;
        height: auto;
        display: block;
        margin: 0 auto;
    }
`;
