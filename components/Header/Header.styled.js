import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: var(--main-400);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;

    z-index: 4;
`;

export const StyledHeading = styled.h1`
    text-align: center;
    display: block;
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
