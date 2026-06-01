import { StyledBookmarkButton } from "./BookmarkButton.styled";
import BeeIcon from "../BeeIcon";
export default function BookmarkButton({
    onBookmarkToggle,
    id,
    bookmarkedActivities,
}) {
    //is favorite const here. compares id to the ids passed saved in state
    const isFavorite = bookmarkedActivities.includes(id);

    return (
        <StyledBookmarkButton
            aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
            onClick={() => onBookmarkToggle(id)}
        >
            <BeeIcon bodyColor={isFavorite ? "#ffcb1e" : "transparent"} />
        </StyledBookmarkButton>
    );
}
