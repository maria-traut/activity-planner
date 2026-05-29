import useSWR from "swr";
import { getCountries } from "@/lib/countries";
import {
  StyledFormFlex,
  StyledFormSection,
  StyledFormButtonWrap,
  StyledFormButton,
  StyledFormError,
  StyledFormSuccess,
  StyledTextError,
  StyledTextSuccess,
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
        <fieldset>
          <legend>{heading}</legend>
          <p>Loading categories...</p>
        </fieldset>
      </form>
    );
  }

  if (!categories || error) {
    return (
      <form>
        <fieldset>
          <legend>{heading}</legend>
          <p>An error occured while fetching categories.</p>
        </fieldset>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
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
                  ? activity.categories.map((category) => category._id)
                  : []
              }
            >
              <option value="" disabled>
                Please select at least one category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
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
                <option key={country.code} value={country.code}>
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
          <StyledFormButtonWrap>
            <StyledFormButton
              type="submit"
              disabled={status.type === "success"}
            >
              Submit
            </StyledFormButton>
            {(isCreateActivityMode || isEditActivityMode) && (
              <StyledFormButton
                type="button"
                onClick={() =>
                  isCreateActivityMode
                    ? setIsCreateActivityMode(false)
                    : setIsEditActivityMode(false)
                }
                disabled={status.type === "success"}
              >
                Cancel
              </StyledFormButton>
            )}
            {status.type === "error" && (
              <StyledFormError>Error</StyledFormError>
            )}
            {status.type === "success" && (
              <StyledFormSuccess>Success!</StyledFormSuccess>
            )}
          </StyledFormButtonWrap>
          {status.type !== "" && (
            <StyledFormSection>
              {status.type === "error" && (
                <StyledTextError>{status.message}</StyledTextError>
              )}
              {status.type === "success" && (
                <StyledTextSuccess>{status.message}</StyledTextSuccess>
              )}
            </StyledFormSection>
          )}
        </StyledFormFlex>
      </fieldset>
    </form>
  );
}
