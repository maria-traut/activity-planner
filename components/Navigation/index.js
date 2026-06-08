import {
    StyledBookmarkLink,
    StyledHomeLink,
    StyledMapLink,
    StyledNavbarContainer,
    StyledNavbarEmpty,
    StyledAddActivityButton,
} from "./Navigation.styled";
import { scrollToTop } from "@/components/Global";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import MapIcon from "@/components/icons/MapIcon";

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
