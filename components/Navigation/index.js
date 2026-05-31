import Link from "next/link";
import { StyledNavbarLink, StyledNavbarContainer } from "./Navigation.styled";

export default function Navbar() {
    return (
        <StyledNavbarContainer>
            <StyledNavbarLink href="/bookmarks">BOOKMARKS</StyledNavbarLink>
        </StyledNavbarContainer>
    );
}
