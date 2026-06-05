import useSWR from "swr";
import { getCountries } from "@/lib/countries";
import { StyledToolbar, StyledButton } from "../Global/Global.styled";
import {
    StyledFormFlex,
    StyledFormSection,
    StyledFormWrap,
    StyledFormFieldset,
    StyledCheckboxAndLabelWrap,
} from "./ActivityForm.styled";
import { handleImageUrlValiditation } from "@/lib/imageUrlValidation";
import showToast from "../Toast";
import { useEffect } from "react";

export default function ActivityForm({ onSubmit, status, heading, ...props }) {
    useEffect(() => {
        status.type === "error" && showToast(status.message, "danger");
    });

    const {
        activity,
        isEditActivityMode,
        setIsEditActivityMode,
        isCreateActivityMode,
        setIsCreateActivityMode,
    } = props;
    const { data: categories, isLoading, error } = useSWR("/api/categories");

    if (isLoading) {
        return (
            <form>
                <StyledFormFieldset>
                    <legend>{heading}</legend>
                    <p>Loading categories...</p>
                </StyledFormFieldset>
            </form>
        );
    }

    if (!categories || error) {
        return (
            <form>
                <StyledFormFieldset>
                    <legend>{heading}</legend>
                    <p>An error occured while fetching categories.</p>
                </StyledFormFieldset>
            </form>
        );
    }

    return (
        <StyledFormWrap>
            <form onSubmit={onSubmit}>
                <StyledFormFieldset>
                    <legend>{heading}</legend>
                    <StyledFormFlex>
                        <StyledFormSection>
                            <label htmlFor="title">
                                Title<span aria-hidden>*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={activity?.title}
                                required
                            />
                        </StyledFormSection>
                        <StyledFormSection>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                maxLength={5000}
                                defaultValue={activity?.description}
                            ></textarea>
                        </StyledFormSection>
                        <StyledFormSection>
                            <label htmlFor="imageUrl">Image (URL)</label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                onChange={(event) =>
                                    event.target.validity.customError &&
                                    handleImageUrlValidation(event.target)
                                }
                                onBlur={(event) =>
                                    handleImageUrlValidation(event.target)
                                }
                                defaultValue={
                                    activity?.imageUrl
                                        ? activity?.imageUrl !==
                                          "/placeholder.jpg"
                                            ? activity?.imageUrl
                                            : ""
                                        : ""
                                }
                            />
                        </StyledFormSection>
                        <StyledFormSection>
                            <label htmlFor="categories">
                                Categories<span aria-hidden>*</span>
                            </label>
                            <select
                                id="categories"
                                name="categories"
                                multiple
                                required
                                size={5}
                                defaultValue={
                                    activity?.categories
                                        ? activity.categories.map(
                                              (category) => category._id
                                          )
                                        : []
                                }
                            >
                                <option value="" disabled>
                                    Please select at least one category
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </StyledFormSection>
                        <StyledFormSection>
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                name="country"
                                defaultValue={activity?.country || ""}
                            >
                                <option value="" disabled>
                                    Please select a country
                                </option>
                                {getCountries().map((country) => (
                                    <option
                                        key={country.code}
                                        value={country.code}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </StyledFormSection>
                        <StyledFormSection>
                            <label htmlFor="area">Area</label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                defaultValue={activity?.area}
                            />
                        </StyledFormSection>
                        {isCreateActivityMode && (
                            <StyledCheckboxAndLabelWrap>
                                <input
                                    type="checkbox"
                                    id="addToBookmarks"
                                    name="addToBookmarks"
                                    value="1"
                                />
                                <label htmlFor="addToBookmarks">
                                    Add to my activity bookmarks
                                </label>
                            </StyledCheckboxAndLabelWrap>
                        )}
                        <StyledToolbar $isLast>
                            <StyledButton
                                type="submit"
                                disabled={status.type === "success"}
                            >
                                Submit
                            </StyledButton>
                            {(isCreateActivityMode || isEditActivityMode) && (
                                <StyledButton
                                    type="button"
                                    onClick={() =>
                                        isCreateActivityMode
                                            ? setIsCreateActivityMode(false)
                                            : setIsEditActivityMode(false)
                                    }
                                    disabled={status.type === "success"}
                                >
                                    Cancel
                                </StyledButton>
                            )}
                        </StyledToolbar>
                    </StyledFormFlex>
                </StyledFormFieldset>
            </form>
        </StyledFormWrap>
    );
}
