import styled from "styled-components";
import Link from "next/link";
import { StyledButton } from "../Global/Global.styled";

export const StyledNavbarContainer = styled.nav`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 80px);
    grid-template-rows: repeat(2, 60px);

    justify-content: space-between;

    gap: 15px;
    padding: 0 15px;
    bottom: 0;
    position: fixed;
    z-index: 3;
`;

export const StyledBookmarkLink = styled(Link)`
    width: 80px;
    height: 40px;

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
`;

export const StyledHomeLink = styled(Link)`
    width: 80px;
    height: 40px;
    text-transform: uppercase;

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
    width: 80px;
    height: 60px;
    /* background-color: red; */
    grid-column: 2;
    grid-row: 1;
`;

export const StyledAddActivityButton = styled(StyledButton)`
    grid-column: 2;
    grid-row: 1;

    &:hover {
        border-style: none;
        background-color: transparent;
        color: transparent;
    }
`;
