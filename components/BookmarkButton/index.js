export default function BookmarkButton({ onHandleToggleBookmark, id }) {
    return <button onClick={() => onHandleToggleBookmark(id)}>🐝</button>;
}
