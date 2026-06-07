import styled from "styled-components";
import Link from "next/link";
import { StyledButton } from "../Global/Global.styled";

export const StyledNavbarContainer = styled.nav`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 72px);
    grid-template-rows: repeat(2, 72px);

    justify-content: space-between;

    gap: var(--eight-grid__s);
    padding: 0 var(--eight-grid__normal);
    bottom: 0;
    position: fixed;
    z-index: 3;

    pointer-events: none;
    > * {
        pointer-events: auto;
    }
`;

export const StyledBookmarkLink = styled(Link)`
    width: 72px;
    height: 64px;

    background-color: var(--gray-100);
    border: 1px solid black;
    border-radius: 10px;

    grid-column: 2;
    grid-row: 2;

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    font-weight: bold;

    overflow: hidden;
`;

export const StyledHomeLink = styled(Link)`
    width: 72px;
    height: 64px;
    text-transform: uppercase;
    color: var(--main-900);

    background-color: var(--gray-100);
    border: 1px solid black;
    border-radius: 10px;

    grid-column: 1;
    grid-row: 2;

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    font-weight: bold;
`;

export const StyledNavbarEmpty = styled.div`
    width: 72px;
    height: 64px;
    grid-column: 2;
    grid-row: 1;
`;

export const StyledAddActivityButton = styled(StyledButton)`
    grid-column: 2;
    grid-row: 1;
    background-color: var(--main-500);
    border-color: var(--main-200);

    &:active {
        border-style: none;
        background-color: transparent;
        color: transparent;
    }
`;
