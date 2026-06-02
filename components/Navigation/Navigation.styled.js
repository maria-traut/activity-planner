import styled from "styled-components";
import Link from "next/link";

export const StyledNavbarContainer = styled.nav`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 80px);
    grid-template-rows: repeat(2, 60px);

    justify-content: space-between;

    gap: 15px;
    padding: 0 15px;

    position: fixed;
    bottom: 1em;
    z-index: 2;
`;

export const StyledBookmarkLink = styled(Link)`
    width: 80px;
    height: 60px;

    background-color: lightgoldenrodyellow;
    border: 2px solid black;
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
    height: 60px;

    background-color: lightgoldenrodyellow;
    border: 2px solid black;
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

    background-color: red;

    grid-column: 2;
    grid-row: 1;
`;
