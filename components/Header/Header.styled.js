import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    background-color: var(--complimentary-yellow);
    width: 100%;
    height: 60px;
    position: sticky;
`;

export const StyledHeading = styled.h1`
    text-align: center;
    display: block;
    margin: 0;
    padding-left: 6px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: var(--headline-line-height);
    font-size: 2rem;
    font-family: var(--headline-font-family-new);
    line-height: var(--headline-line-height);
    font-weight: 850;
    html.dark & {
        color: var(--gray-900);
    }
`;

export const StyledStickyToolbar = styled.div`
    position: sticky;
    top: 0;
    z-index: 4;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    height: 60px;
    align-items: center;
    margin-top: -60px;
`;
