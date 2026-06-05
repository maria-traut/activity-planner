import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navigation";
import styled from "styled-components";
import SplashScreen from "@/components/SplashScreen";
import { Toaster } from "react-hot-toast";

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
                            handleNavbarLocation={handleNavbarLocation}
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
                        <Navbar
                            onNavbarLocation={handleNavbarLocation}
                            navbarLocation={navbarLocation}
                            isCreateActivityMode={isCreateActivityMode}
                            setIsCreateActivityMode={setIsCreateActivityMode}
                            activityFormStatus={activityFormStatus}
                            setActivityFormStatus={setActivityFormStatus}
                        />
                    </StyledPageWrapper>
                )}
            </SWRConfig>
        </>
    );
}

const StyledPageWrapper = styled.div`
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
