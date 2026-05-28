import useSWR from "swr";
import styled, { keyframes } from "styled-components";
import { countries } from "@/lib/countries";

export default function ActivityForm({ onSubmit, status, heading, ...props }) {
  const { activity } = props;
  console.log("props", activity);
  const { data: categories, isLoading, error } = useSWR("/api/categories");

  console.log("activity", activity);
  console.log("categories", activity?.categories);

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
        <FormFlex>
          <FormSection>
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
          </FormSection>
          <FormSection>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={activity?.description}
            ></textarea>
          </FormSection>
          <FormSection>
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
          </FormSection>
          <FormSection>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              defaultValue={activity?.country || ""}
            >
              <option value="">Please select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </FormSection>
          <FormSection>
            <label htmlFor="area">Area</label>
            <input
              type="text"
              id="area"
              name="area"
              defaultValue={activity?.area}
            />
          </FormSection>
          <FormButtonWrap>
            <FormButton type="submit">Submit</FormButton>
            {status.type === "error" && <FormError>Error</FormError>}
            {status.type === "success" && <FormSuccess>Success!</FormSuccess>}
          </FormButtonWrap>
          {status.type !== "" && (
            <FormSection>
              {status.type === "error" && (
                <TextError>{status.message}</TextError>
              )}
              {status.type === "success" && (
                <TextSuccess>{status.message}</TextSuccess>
              )}
            </FormSection>
          )}
        </FormFlex>
      </fieldset>
    </form>
  );
}

const FormButton = styled.button`
  all: unset;
  border-radius: 10px;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    display:none;
  }
`;

const FormStatus = styled.div`
  all: unset;
  border-radius: 10px;
  color: black;
  border: 1px solid black;
  background: white;
  padding: 0.5em 1em;
`;

const FormError = styled(FormStatus)`
  border-color: red;
  color: red;
`;

const FormSuccess = styled(FormStatus)`
  border-color: green;
  color: green;

  opacity: 1;
  animation: ${fadeOut} 1s ease forwards;
  animation-delay: 2s;
`;

const TextError = styled.p`
  color: red;
`;

const TextSuccess = styled.p`
  color: green;

  opacity: 1;
  animation: ${fadeOut} 1s ease forwards;
  animation-delay: 2s;
`;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const FormButtonWrap = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const FormFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
