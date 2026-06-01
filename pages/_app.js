import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

import Navbar from "@/components/Navigation";

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
    function handleBookmarkToggle(id) {
        setBookmarkedActivityIds((prevBookmarkedActivities) => {
            const isAdded = prevBookmarkedActivities.includes(id);
            if (isAdded) {
                return prevBookmarkedActivities.filter(
                    (bookmarkId) => bookmarkId !== id
                );
            }

            return [...prevBookmarkedActivities, id];
        });
    }
    return (
        <>
            <GlobalStyle />
            <SWRConfig value={{ fetcher }}>
                <Component
                    {...pageProps}
                    bookmarkedActivityIds={bookmarkedActivityIds}
                    handleBookmarkToggle={handleBookmarkToggle}
                    setBookmarkedActivityIds={setBookmarkedActivityIds}
                />
                <Navbar />
            </SWRConfig>
        </>
    );
}
