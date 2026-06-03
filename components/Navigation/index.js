import {
    StyledBookmarkLink,
    StyledHomeLink,
    StyledNavbarContainer,
    StyledNavbarEmpty,
    StyledButton,
} from "./Navigation.styled";
import BeeIcon from "../BeeIcon";
import NewBeeIcon from "../BeeIcon/newbee";
import { scrollToTop } from "../Global";

export default function Navbar({
    navbarLocation,
    isCreateActivityMode,
    setIsCreateActivityMode,
    setActivityFormStatus,
}) {
    return (
        <StyledNavbarContainer>
            {navbarLocation === "/" ? (
                <button
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
                </button>
            ) : (
                <StyledNavbarEmpty
                    onClick={() => console.log("empty has been clicked")}
                />
            )}
            <StyledNavbarEmpty
                onClick={() => console.log("empty has been clicked")}
            />
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
