import { useState } from "react";
import {
    StyledToolbarWrap,
    StyledToolbar,
    StyledButton,
} from "../Global/Global.styled";
import {
    StyledFormFieldset,
    StyledFormWrap,
    StyledFormSection,
} from "./SortButton.styled";

export default function SortButton({ onActivitySort }) {
    const [isSortActivityMode, setIsSortActivityMode] = useState(false);
    const [selectedSort, setSelectedSort] = useState("newest");

    function handleSubmit(event) {
        event.preventDefault();
        onActivitySort(selectedSort);
        setIsSortActivityMode(false);
    }

    function handleReset() {
        setSelectedSort("newest");
        onActivitySort("newest");
        setIsSortActivityMode(false);
    }

    return (
        <>
            <StyledToolbarWrap>
                <StyledToolbar>
                    <StyledButton
                        type="button"
                        onClick={() =>
                            setIsSortActivityMode(!isSortActivityMode)
                        }
                    >
                        Sort{isSortActivityMode ? " ▲" : " ▼"}
                    </StyledButton>
                </StyledToolbar>
            </StyledToolbarWrap>
            {isSortActivityMode && (
                <StyledFormWrap>
                    <form onSubmit={handleSubmit}>
                        <StyledFormFieldset>
                            <legend>Sort Activities</legend>
                            <div>
                                <p>Date</p>
                                <StyledFormSection>
                                    <label htmlFor="sort-newest">
                                        <input
                                            type="radio"
                                            id="sort-newest"
                                            name="sort"
                                            value="newest"
                                            checked={selectedSort === "newest"}
                                            onChange={() =>
                                                setSelectedSort("newest")
                                            }
                                        />
                                        New to Old
                                    </label>

                                    <label htmlFor="sort-oldest">
                                        <input
                                            type="radio"
                                            id="sort-oldest"
                                            name="sort"
                                            value="oldest"
                                            checked={selectedSort === "oldest"}
                                            onChange={() =>
                                                setSelectedSort("oldest")
                                            }
                                        />
                                        Old to New
                                    </label>
                                </StyledFormSection>
                            </div>
                            <div>
                                <p>Title</p>
                                <StyledFormSection>
                                    <label htmlFor="sort-az">
                                        <input
                                            type="radio"
                                            id="sort-az"
                                            name="sort"
                                            value="az"
                                            checked={selectedSort === "az"}
                                            onChange={() =>
                                                setSelectedSort("az")
                                            }
                                        />
                                        A to Z
                                    </label>

                                    <label htmlFor="sort-za">
                                        <input
                                            type="radio"
                                            id="sort-za"
                                            name="sort"
                                            value="za"
                                            checked={selectedSort === "za"}
                                            onChange={() =>
                                                setSelectedSort("za")
                                            }
                                        />
                                        Z to A
                                    </label>
                                </StyledFormSection>
                            </div>

                            <StyledToolbar>
                                <StyledButton type="submit">Apply</StyledButton>
                                <StyledButton
                                    type="button"
                                    onClick={handleReset}
                                >
                                    Reset
                                </StyledButton>
                            </StyledToolbar>
                        </StyledFormFieldset>
                    </form>
                </StyledFormWrap>
            )}
        </>
    );
}
