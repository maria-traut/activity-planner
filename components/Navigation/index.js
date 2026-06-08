import {
    StyledBookmarkLink,
    StyledHomeLink,
    StyledMapLink,
    StyledNavbarContainer,
    StyledNavbarEmpty,
    StyledAddActivityButton,
} from "./Navigation.styled";
import NewBeeIcon from "../BeeIcon/newbee";
import { scrollToTop } from "../Global";
import BookmarkIcon from "../BookmarkIcon";
import MapIcon from "../MapIcon";

export default function Navbar({
    navbarLocation,
    onNavbarLocation,
    isCreateActivityMode,
    setIsCreateActivityMode,
    setActivityFormStatus,
}) {
    return (
        <StyledNavbarContainer>
            {navbarLocation === "/" && !isCreateActivityMode ? (
                <StyledAddActivityButton
                    onClick={() => {
                        setIsCreateActivityMode(!isCreateActivityMode);
                        setActivityFormStatus({
                            type: "",
                            message: "",
                        });
                        scrollToTop();
                    }}
                >
                    ➕
                </StyledAddActivityButton>
            ) : (
                <StyledNavbarEmpty />
            )}

            <StyledBookmarkLink
                aria-label="Go to Bookmarks"
                href="/bookmarks"
                onClick={() => onNavbarLocation("/bookmarks")}
            >
                <BookmarkIcon />
            </StyledBookmarkLink>

            <StyledHomeLink
                aria-label="Go to Homepage"
                href="/"
                onClick={() => {
                    isCreateActivityMode
                        ? setIsCreateActivityMode(false)
                        : setIsEditActivityMode(false);
                    onNavbarLocation("/");
                }}
            >
                Home
            </StyledHomeLink>
            <StyledMapLink
                aria-label="Go to Map"
                href="/map"
                onClick={() => onNavbarLocation("/map")}
            >
                <MapIcon />
            </StyledMapLink>
        </StyledNavbarContainer>
    );
}
