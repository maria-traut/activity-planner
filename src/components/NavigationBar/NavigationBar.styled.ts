import Link from "next/link";
import styled, { css } from "styled-components";

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

const navigationItemStyles = css<{ $isActive?: boolean }>`
	all: unset;
	display: block;
	cursor: pointer;
	display: block;

	padding: var(--eight-grid__s) var(--eight-grid__l);

	border-radius: var(--border-radius-rounded);

	background-color: ${({ $isActive }) => ($isActive ? "var(--gray-100)" : "transparent")};

	&:hover {
		border-color: var(--main-900);
	}

	img,
	svg {
		height: 32px;
		display: block;
	}
`;

export const StyledNavigationLink = styled(Link)<{ $isActive?: boolean }>`
	${navigationItemStyles}
`;

export const StyledNavigationButton = styled.button<{ $isActive?: boolean }>`
	${navigationItemStyles}
`;
