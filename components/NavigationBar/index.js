import { useRouter } from "next/router";
import {
    StyledNavigation,
    StyledNavigationBar,
    StyledNavigationLink,
} from "./NavigationBar.styled";

export default function NavigationBar({ onThemeToggle }) {
    const router = useRouter();
    const { id } = router.query;

    console.log(router, "router");

    const navigationBarElements = [
        { path: "/", label: "Home", icon: "/icons/activibee-home.svg" },
        {
            path: "/map",
            label: "Activity Map",
            icon: "/icons/activibee-bookmarks.svg",
        },
        {
            path: "/bookmarks",
            label: "My Beekmarks",
            icon: "/icons/activibee-bookmarks.svg",
        },
        {
            label: "switch between light and dark mode",
            icon: "/icons/light-dark-switch.svg",
            action: onThemeToggle,
        },
    ];

    return (
        <StyledNavigationBar>
            <StyledNavigation>
                {navigationBarElements.map((element, key) => (
                    <li key={key}>
                        {element?.path ? (
                            <StyledNavigationLink
                                $isActive={element?.path === router?.pathname}
                                href={element?.path}
                                aria-label={element?.label}
                            >
                                <img src={element?.icon} alt="" />
                            </StyledNavigationLink>
                        ) : (
                            <StyledNavigationLink
                                as="button"
                                onClick={element?.action}
                            >
                                <img src={element?.icon} alt="" />
                            </StyledNavigationLink>
                        )}
                    </li>
                ))}
            </StyledNavigation>
        </StyledNavigationBar>
    );
}
