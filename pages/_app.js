import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { StyledToaster } from "@/components/Toast/Toast.styled";
import Navbar from "@/components/Navigation";
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
                <Toaster position="bottom-center" reverseOrder={false} />
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
            </SWRConfig>
        </>
    );
}
