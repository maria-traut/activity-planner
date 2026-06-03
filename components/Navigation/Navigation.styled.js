import styled from "styled-components";
import Link from "next/link";

export const StyledNavbarContainer = styled.nav`
    width: 100%;

    display: flex;
    flex-direction: row-reverse;
    bottom: var(--spacing-normal);

    position: fixed;
    z-index: 2;

    width: auto;
    right: var(--spacing-normal);
    gap: var(--spacing-normal);
`;

export const StyledNavbarLink = styled(Link)`
    background-color: lightgoldenrodyellow;
    border: var(--border-normal);
    border-radius: var(--border-radius-normal);

    padding: var(--spacing-small) var(--spacing-normal);

    text-decoration: none;
    font-weight: bold;
`;
