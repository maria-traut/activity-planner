import { StyledBookmarkButton } from "./BookmarkButton.styled";
export default function BookmarkButton({
    onHandleToggleBookmark,
    id,
    bookmarkedActivities,
}) {
    //is favorite const here. compares id to the ids passed saved in state
    const isFavorite = bookmarkedActivities.includes(id);

    return (
        <>
            {isFavorite ? (
                <StyledBookmarkButton
                    onClick={() => onHandleToggleBookmark(id)}
                >
                    🐝
                </StyledBookmarkButton>
            ) : (
                <StyledBookmarkButton
                    onClick={() => onHandleToggleBookmark(id)}
                >
                    ⭕
                </StyledBookmarkButton>
            )}
        </>
    );
}

{
    /* <StyledBookmarkButton onClick={() => onHandleToggleBookmark(id)}>
            ⭕
        </StyledBookmarkButton> */
}
