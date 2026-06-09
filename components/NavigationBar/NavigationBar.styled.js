import styled from "styled-components";
import Link from "next/link";

export const StyledNavigationBar = styled.nav`
    position: sticky;
    z-index: 100;
    bottom: 0;
    left: 0px;
    width: 100%;
    background: var(--complimentary-yellow);
    padding: var(--eight-grid__s);
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

    border-radius: var(--border-radius-rounded);

    background-color: ${({ $isActive }) =>
        $isActive ? "var(--gray-100)" : "transparent"};

    &:hover {
        border-color: var(--main-900);
    }

    img,
    svg {
        height: 32px;
        display: block;
    }
`;
