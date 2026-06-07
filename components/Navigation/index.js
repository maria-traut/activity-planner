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
                <NewBeeIcon size="40" rotation="30" />
                <NewBeeIcon size="30" rotation="-50" />
            </StyledBookmarkLink>
            <StyledHomeLink
                aria-label="Go to Homepage"
                href="/"
                onClick={() => onNavbarLocation("/")}
            >
                Home
            </StyledHomeLink>
            <StyledMapLink
                aria-label="Go to Map"
                href="/map"
                onClick={() => onNavbarLocation("/map")}
            >
                🌍
            </StyledMapLink>
        </StyledNavbarContainer>
    );
}
