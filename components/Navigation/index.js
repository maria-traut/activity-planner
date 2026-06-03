import {
    StyledBookmarkLink,
    StyledHomeLink,
    StyledNavbarContainer,
    StyledNavbarEmpty,
    StyledAddActivityButton,
} from "./Navigation.styled";
import NewBeeIcon from "../BeeIcon/newbee";
import { scrollToTop } from "../Global";
import { StyledButton } from "../Global/Global.styled";

export default function Navbar({
    navbarLocation,
    onNavbarLocation,
    isCreateActivityMode,
    setIsCreateActivityMode,
    setActivityFormStatus,
}) {
    return (
        <StyledNavbarContainer>
            {navbarLocation === "/" ? (
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
                <StyledNavbarEmpty
                    onClick={() => console.log("empty has been clicked")}
                />
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
        </StyledNavbarContainer>
    );
}
