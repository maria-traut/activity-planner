import styled from "styled-components";
import Link from "next/link";

export const StyledNavigationBar = styled.nav`
    position: sticky;
    z-index: 100;
    bottom: 0;
    left: 0px;
    width: 100%;
    background: var(--main-400);
    padding: var(--eight-grid__normal);
`;

export const StyledNavigation = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    margin: 0;
`;

export const StyledNavigationLink = styled(Link)`
    all: unset;
    display: block;
    cursor: pointer;
    display: block;

    padding: var(--eight-grid__s) var(--eight-grid__l);
    background: var(--gray-100);
    border-radius: var(--border-radius-rounded);
    border: var(--border-normal);

    background-color: ${({ $isActive }) =>
        $isActive ? "var(--gray-100)" : "transparent"};

    &:hover {
        border-color: var(--main-900);
    }

    img,
    svg {
        height: var(--text-line-height);
        display: block;
    }
`;
