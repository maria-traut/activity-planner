import { StyledBookmarkButton } from "./BookmarkButton.styled";
import BeeIcon from "../BeeIcon";
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
        }, 2000);
    }

    return (
        <StyledBookmarkButton
            aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
            onClick={() => handleBookmarkButtonCLick(id)}
        >
            <NewBeeIcon
                className={isAnimating ? "isAnimating" : ""}
                bodyColor={isFavorite ? "#ffcb1e" : "transparent"}
            />
        </StyledBookmarkButton>
    );
}
