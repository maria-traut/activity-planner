import { StyledBookmarkButton } from "./BookmarkButton.styled";
export default function BookmarkButton({ onHandleToggleBookmark, id }) {
    return (
        <StyledBookmarkButton onClick={() => onHandleToggleBookmark(id)}>
            🐝
        </StyledBookmarkButton>
    );
}
