import { useState } from "react";
import { StyledToolbarWrap, StyledToolbar } from "../Global/Global.styled";
import {
    StyledFormFieldset,
    StyledFormWrap,
    StyledFormSection,
    StyledButton,
} from "./SortButton.styled";
import Image from "next/image";

export default function SortButton({ onActivitySort, activitySortOrder }) {
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

    function getSortLabel(order) {
        switch (order) {
            case "newest":
                return "Newest";
            case "oldest":
                return "Oldest";
            case "lastModified":
                return "Recently Updated";
            case "az":
                return "A to Z";
            case "za":
                return "Z to A";
            default:
                return "Sort";
        }
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
                        {getSortLabel(activitySortOrder)}
                        <Image
                            src="/sort.png"
                            alt="sort"
                            width={16}
                            height={16}
                        />
                    </StyledButton>
                </StyledToolbar>
            </StyledToolbarWrap>
            {isSortActivityMode && (
                <StyledFormWrap>
                    <form onSubmit={handleSubmit}>
                        <StyledFormFieldset>
                            <legend>Sort Activities by</legend>
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
                                        Newest
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
                                        Oldest
                                    </label>
                                    <label htmlFor="sort-lastModified">
                                        <input
                                            type="radio"
                                            id="sort-lastModified"
                                            name="sort"
                                            value="lastModified"
                                            checked={
                                                selectedSort === "lastModified"
                                            }
                                            onChange={() =>
                                                setSelectedSort("lastModified")
                                            }
                                        />
                                        Recently Updated
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
