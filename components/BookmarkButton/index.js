import { StyledBookmarkButton } from "./BookmarkButton.styled";
import BeeIcon from "../BeeIcon";
import NewBeeIcon from "../BeeIcon/newbee";
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
            <NewBeeIcon bodyColor={isFavorite ? "#ffcb1e" : "transparent"} />
        </StyledBookmarkButton>
    );
}
