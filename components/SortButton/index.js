import { useState } from "react";
import styled from "styled-components";

export default function SortButton({ onActivityDateSort, activitySortOrder }) {
  const [isSortActivityMode, setIsSortActivityMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dateOrder = formData.get("sort-date");
    onActivityDateSort(dateOrder);
    setIsSortActivityMode(false);
  }

  function handleReset() {
    onActivityDateSort("newest");
    setIsSortActivityMode(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSortActivityMode(!isSortActivityMode)}
      >
        Sort{isSortActivityMode ? " ▲" : " ▼"}
      </button>
      {isSortActivityMode && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <StyledSortWrapper>
              <div>
                <label htmlFor="sort-title">Title </label>
                <select id="sort-title" name="sort-title">
                  <option value="az">A to Z</option>
                  <option value="za">Z to A</option>
                </select>
              </div>
              <div>
                <label htmlFor="sort-date">Date </label>
                <select
                  id="sort-date"
                  name="sort-date"
                  defaultValue={activitySortOrder}
                >
                  <option value="newest">New to Old</option>
                  <option value="oldest">Old to New</option>
                </select>
              </div>
            </StyledSortWrapper>
            <button type="submit">Apply</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
}

const StyledSortWrapper = styled.div`
  display: flex;
`;
