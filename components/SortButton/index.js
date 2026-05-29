export default function SortButton() {
  return (
    <div>
      <div>
        <label htmlFor="sort-title">Title </label>
        <select id="sort-title">
          <option value="az">A to Z</option>
          <option value="za">Z to A</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort-date">Date </label>
        <select id="sort-date">
          <option value="newest">New to Old</option>
          <option value="oldest">Old to New</option>
        </select>
      </div>
    </div>
  );
}
