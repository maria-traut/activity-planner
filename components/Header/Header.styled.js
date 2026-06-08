import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: var(--main-400);
    width: 100%;
    height: 50px;
    position: sticky;
`;

export const StyledHeading = styled.h1`
    text-align: center;
    display: block;
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: var(--headline-line-height);
`;

export const StyledStickyToolbar = styled.div`
    position: sticky;
    top: 0;
    z-index: 4;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    height: 50px;
    align-items: center;
    margin-top: -50px;
`;
