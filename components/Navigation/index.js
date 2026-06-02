import {
    StyledBookmarkLink,
    StyledHomeLink,
    StyledNavbarContainer,
    StyledNavbarEmpty,
} from "./Navigation.styled";
import BeeIcon from "../BeeIcon";
import NewBeeIcon from "../BeeIcon/newbee";

export default function Navbar() {
    return (
        <StyledNavbarContainer>
            <StyledNavbarEmpty />
            <StyledBookmarkLink aria-label="Go to Bookmarks" href="/bookmarks">
                <NewBeeIcon size="40" rotation="30" />
                <NewBeeIcon size="30" rotation="-50" />
            </StyledBookmarkLink>
            <StyledHomeLink aria-label="Go to Homepage" href="/">
                Home
            </StyledHomeLink>
        </StyledNavbarContainer>
    );
}
