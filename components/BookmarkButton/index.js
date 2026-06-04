import { StyledBookmarkButton } from "./BookmarkButton.styled";
import NewBeeIcon from "../BeeIcon/newbee";
import { useState } from "react";
import showToast from "../Toast";
export default function BookmarkButton({
    onBookmarkToggle,
    id,
    bookmarkedActivityIds,
}) {
    const isFavorite = bookmarkedActivityIds?.includes(id);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleBookmarkButtonClick(id) {
        onBookmarkToggle(id);
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    }

    return (
        <StyledBookmarkButton
            aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
            onClick={() => handleBookmarkButtonClick(id)}
        >
            <NewBeeIcon
                className={isAnimating ? "isAnimating" : ""}
                bodyColor={isFavorite ? "var(--main-500)" : "var(--gray-300)"}
                size="50"
                isFavorite={isFavorite}
            />
        </StyledBookmarkButton>
    );
}
