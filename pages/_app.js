import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { KeyframesFadeOut } from "@/components/Global/Global.styled";
import Navbar from "@/components/Navigation";
import styled from "styled-components";

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
        }, 2000);
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
            <GlobalStyle />
            <SWRConfig value={{ fetcher }}>
                {isLoading ? (
                    <StyledLoading />
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

const StyledLoading = styled(Loading)`
    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;
`;

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
