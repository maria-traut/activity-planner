import { StyledBookmarkButton } from "./BookmarkButton.styled";
import NewBeeIcon from "../BeeIcon/newbee";
import { useState } from "react";
export default function BookmarkButton({
    onBookmarkToggle,
    id,
    bookmarkedActivityIds,
}) {
    const isFavorite = bookmarkedActivityIds?.includes(id);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleBookmarkButtonCLick(id) {
        onBookmarkToggle(id);
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    }

    return (
        <StyledBookmarkButton
            aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
            onClick={() => handleBookmarkButtonCLick(id)}
        >
            <NewBeeIcon
                className={isAnimating ? "isAnimating" : ""}
                bodyColor={isFavorite ? "var(--main-500)" : "var(--gray-300"}
                size="50"
                isFavorite={isFavorite}
            />
        </StyledBookmarkButton>
    );
}
