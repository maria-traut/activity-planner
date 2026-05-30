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
    const [bookmarkedActivities, setBookmarkedActivities] =
        useLocalStorageState("bookmarkedActivities", {
            defaultValue: [],
        });
    function handleToggleBookmark(id) {
        setBookmarkedActivities((prevBookmarkedActivities) => {
            const isAdded = prevBookmarkedActivities.find(
                (toggledId) => toggledId === id
            ); //.includes(id) besser?
            if (isAdded) {
                return prevBookmarkedActivities.filter(
                    (bookmarkId) => bookmarkId !== id
                ); //removes the bookmark id from the list
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
                    bookmarkedActivities={bookmarkedActivities}
                    onHandleToggleBookmark={handleToggleBookmark}
                />
                <Navbar />
            </SWRConfig>
        </>
    );
}
