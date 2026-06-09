import { useRouter } from "next/router";
import {
    StyledNavigation,
    StyledNavigationBar,
    StyledNavigationLink,
} from "./NavigationBar.styled";

import HomeIcon from "@/components/icons/HomeIcon";
import MapIcon from "@/components/icons/MapIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";

export default function NavigationBar({ theme, setTheme }) {
    const router = useRouter();

    return (
        <StyledNavigationBar>
            <StyledNavigation>
                <li>
                    <StyledNavigationLink
                        $isActive={router?.pathname === "/"}
                        href="/"
                        aria-label="Home"
                    >
                        <MapIcon />
                    </StyledNavigationLink>
                </li>
                <li>
                    <StyledNavigationLink
                        $isActive={router?.pathname === "/map"}
                        href="/map"
                        aria-label="Activity Map"
                    >
                        <MapIcon />
                    </StyledNavigationLink>
                </li>
                <li>
                    <StyledNavigationLink
                        $isActive={router?.pathname === "/bookmarks"}
                        href="/bookmarks"
                        aria-label="My Beekmarks"
                    >
                        <BookmarkIcon />
                    </StyledNavigationLink>
                </li>
                <li>
                    <StyledNavigationLink
                        as="button"
                        onClick={() =>
                            setTheme((prev) =>
                                prev === "dark" ? "light" : "dark"
                            )
                        }
                    >
                        <img
                            src="/icons/light-dark-switch.svg"
                            alt="switch between light and dark mode"
                        />
                    </StyledNavigationLink>
                </li>
            </StyledNavigation>
        </StyledNavigationBar>
    );
}
