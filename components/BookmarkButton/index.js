import { StyledBookmarkButton } from "./BookmarkButton.styled";
import BeeIcon from "../BeeIcon";
export default function BookmarkButton({
    onBookmarkToggle,
    id,
    bookmarkedActivityIds,
}) {
    const isFavorite = bookmarkedActivityIds?.includes(id);

    return (
        <StyledBookmarkButton
            aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
            onClick={() => onBookmarkToggle(id)}
        >
            <BeeIcon bodyColor={isFavorite ? "#ffcb1e" : "transparent"} />
        </StyledBookmarkButton>
    );
}
