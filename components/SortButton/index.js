import { useState } from "react";
import styled from "styled-components";

export default function SortButton() {
  const [isSortActivityMode, setIsSortActivityMode] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSortActivityMode(!isSortActivityMode)}
      >
        Sort{isSortActivityMode ? " ▲" : " ▼"}
      </button>
      {isSortActivityMode && (
        <form>
          <fieldset>
            <StyledSortWrapper>
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
            </StyledSortWrapper>
            <button type="submit">Apply</button>
            <button type="button">Reset</button>
          </fieldset>
        </form>
      )}
    </>
  );
}

const StyledSortWrapper = styled.div`
  display: flex;
`;
