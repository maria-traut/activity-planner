import { StyledNavbarLink, StyledNavbarContainer } from "./Navigation.styled";
import BeeIcon from "../BeeIcon";

export default function Navbar() {
    return (
        <StyledNavbarContainer>
            <StyledNavbarLink aria-label="Go to Bookmarks" href="/bookmarks">
                <BeeIcon size="50" rotation="30" />
            </StyledNavbarLink>
        </StyledNavbarContainer>
    );
}
