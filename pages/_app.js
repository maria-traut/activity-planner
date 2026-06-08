import { SWRConfig } from "swr";
import GlobalStyle from "@/styles";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SplashScreen from "@/components/SplashScreen";
import { Toaster } from "react-hot-toast";
import NavigationBar from "@/components/NavigationBar";

const fetcher = async (resource, init) => {
    const result = await fetch(resource, init);

    if (!result.ok) {
        const error = new Error("An error occurred while fetching the data.");
        error.info = await result.json();
        error.status = result.status;
        throw error;
    }

    return result.json();
};

export default function App({ Component, pageProps }) {
    const [bookmarkedActivityIds, setBookmarkedActivityIds] =
        useLocalStorageState("bookmarkedActivityIds", {
            defaultValue: [],
        });
    const [navbarLocation, setNavbarLocation] = useState("/");
    function handleNavbarLocation(location) {
        setNavbarLocation((prev) => location);
    }
    const [isCreateActivityMode, setIsCreateActivityMode] = useState(false);
    const [activityFormStatus, setActivityFormStatus] = useState({
        type: "",
        message: "",
    });

    const [themeToggle, setThemeToggle] = useLocalStorageState("theme", {
        defaultValue: "",
    });

    const [theme, setTheme] = useLocalStorageState("theme", {
        defaultValue: "system",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const splashScreenTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => {
            clearTimeout(splashScreenTimer);
        };
    }, []);

    function handleBookmarkToggle(id) {
        setBookmarkedActivityIds((prevBookmarkedActivityIds) => {
            const isAdded = prevBookmarkedActivityIds.includes(id);
            if (isAdded) {
                return prevBookmarkedActivityIds.filter(
                    (bookmarkId) => bookmarkId !== id
                );
            }

            return [...prevBookmarkedActivityIds, id];
        });
    }

    function handleBookmarkedActivityIdsDelete(id) {
        setBookmarkedActivityIds((prevBookmarkedActivityIds) =>
            prevBookmarkedActivityIds.filter((bookmarkId) => bookmarkId !== id)
        );
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const root = document.documentElement;

            root.classList.remove("dark", "light", "system");

            switch (theme) {
                case "dark":
                    root.classList.add("dark");
                    break;

                case "light":
                    root.classList.add("light");
                    break;

                case "system":
                    root.classList.add("system");

                    // Optional: also add the resolved theme
                    root.classList.add(mediaQuery.matches ? "dark" : "light");
                    break;
            }
        };

        applyTheme();

        const handleChange = () => {
            if (theme === "system") {
                applyTheme();
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [theme]);

    function handleThemeToggle() {
        console.log("handleThemeToggle");

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        setTheme((currentTheme) => {
            switch (currentTheme) {
                case "dark":
                    return prefersDark ? "light" : "system";

                case "light":
                    return prefersDark ? "system" : "dark";

                case "system":
                    return prefersDark ? "light" : "dark";

                default:
                    return "system";
            }
        });
    }

    return (
        <>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={12}
                containerStyle={{
                    bottom: 80,
                }}
            />
            <GlobalStyle />
            <SWRConfig value={{ fetcher }}>
                {isLoading ? (
                    <SplashScreen />
                ) : (
                    <StyledPageWrapper>
                        <Component
                            {...pageProps}
                            onNavbarLocation={handleNavbarLocation}
                            bookmarkedActivityIds={bookmarkedActivityIds}
                            handleBookmarkToggle={handleBookmarkToggle}
                            onBookmarkedActivityIdsDelete={
                                handleBookmarkedActivityIdsDelete
                            }
                            isCreateActivityMode={isCreateActivityMode}
                            setIsCreateActivityMode={setIsCreateActivityMode}
                            activityFormStatus={activityFormStatus}
                            setActivityFormStatus={setActivityFormStatus}
                        />
                        <NavigationBar onThemeToggle={handleThemeToggle} />
                    </StyledPageWrapper>
                )}
            </SWRConfig>
        </>
    );
}

const StyledPageWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    animation: fadeIn 0.5s ease forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
