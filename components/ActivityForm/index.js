import useSWR from "swr";
import { getCountries } from "@/lib/countries";
import {
    StyledToolbar,
    StyledButton,
    StyledStatusMessageError,
    StyledStatusMessageSuccess,
} from "../Global/Global.styled";
import {
    StyledFormFlex,
    StyledFormSection,
    StyledFormWrap,
    StyledFormFieldset,
} from "./ActivityForm.styled";

export default function ActivityForm({ onSubmit, status, heading, ...props }) {
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
                        <StyledToolbar>
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
                            {status.type === "error" && (
                                <StyledStatusMessageError>
                                    Error
                                </StyledStatusMessageError>
                            )}
                            {status.type === "success" && (
                                <StyledStatusMessageSuccess>
                                    Success
                                </StyledStatusMessageSuccess>
                            )}
                        </StyledToolbar>
                        {status.type !== "" && (
                            <StyledFormSection>
                                {status.type === "error" && (
                                    <StyledStatusMessageError>
                                        {status.message}
                                    </StyledStatusMessageError>
                                )}
                                {status.type === "success" && (
                                    <StyledStatusMessageSuccess>
                                        {status.message}
                                    </StyledStatusMessageSuccess>
                                )}
                            </StyledFormSection>
                        )}
                    </StyledFormFlex>
                </StyledFormFieldset>
            </form>
        </StyledFormWrap>
    );
}
