import styled from "styled-components";
import Link from "next/link";

export const StyledNavbarContainer = styled.nav`
    width: 100%;

    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-items: stretch;
    gap: 15px;

    bottom: 1em;

    position: fixed;
    z-index: 2;
`;

export const StyledNavbarLink = styled(Link)`
    background-color: lightgoldenrodyellow;
    border: 2px solid black;
    border-radius: 10px;
    width: 80px;
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 0.5em 1em; */
    /* margin-right: 15px; */

    text-decoration: none;
    font-weight: bold;
`;

export const StyledNavbarEmpty = styled.div`
    width: 80px;
    height: 60px;
`;
