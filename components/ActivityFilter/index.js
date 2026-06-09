import { useState } from "react";
import useSWR from "swr";
import { getCountries } from "@/lib/countries";
import {
    StyledCheckboxAndLabelWrap,
    StyledFormFieldset,
    StyledFormFlex,
    StyledFormSection,
    StyledFormWrap,
} from "@/components/ActivityForm/ActivityForm.styled";
import { StyledButton, StyledToolbar } from "@/components/Global/Global.styled";
import { activityFilterLabels } from "@/lib/activityFilter";

export default function ActivityFilter({
    onActivityFilterApply,
    onActivityFilterReset,
    heading,
    activityFilterConfiguration,
}) {
    const [openedActivityFilterOption, setOpenedActivityFilterOption] =
        useState("");

    const {
        data: activities,
        isLoading: activitiesLoading,
        error: activitiesError,
    } = useSWR(`/api/activities`);
    const uniqueCountriesUsed = new Set(
        (activities || []).map((activity) => activity.country)
    );

    const {
        data: categories,
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useSWR("/api/categories");

    const isLoading = activitiesLoading || categoriesLoading;
    const hasError = activitiesError || categoriesError;

    const [
        temporaryActivityFilterConfiguration,
        setTemporaryActivityFilterConfiguration,
    ] = useState(activityFilterConfiguration);

    function isFilterActive(value) {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "boolean") return value;
        return value !== "";
    }

    if (isLoading) {
        return <StyledFormWrap>Loading categories...</StyledFormWrap>;
    }

    if (hasError) {
        return <StyledFormWrap>Data could not be loaded.</StyledFormWrap>;
    }

    return (
        <StyledFormWrap>
            <form onSubmit={onActivityFilterApply}>
                <StyledFormFieldset>
                    <legend>{heading}</legend>
                    <StyledFormFlex>
                        <StyledToolbar>
                            {activityFilterLabels.map(({ value, label }) => (
                                <StyledButton
                                    key={value}
                                    $isActive={isFilterActive(
                                        temporaryActivityFilterConfiguration[
                                            value
                                        ]
                                    )}
                                    type="button"
                                    $isOpen={
                                        openedActivityFilterOption === value
                                    }
                                    onClick={() =>
                                        setOpenedActivityFilterOption((prev) =>
                                            prev === value ? "" : value
                                        )
                                    }
                                >
                                    {label}
                                </StyledButton>
                            ))}
                        </StyledToolbar>
                        <StyledFormFieldset
                            $isHidden={openedActivityFilterOption !== "title"}
                        >
                            <legend>Title</legend>
                            <StyledFormFlex>
                                <StyledFormSection>
                                    <label htmlFor="title">
                                        Search text inside the title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={
                                            temporaryActivityFilterConfiguration.title
                                        }
                                        onChange={(event) =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    title: event.target.value,
                                                })
                                            )
                                        }
                                    />
                                </StyledFormSection>
                                <StyledToolbar $isLast>
                                    <StyledButton
                                        type="button"
                                        onClick={() =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    title: "",
                                                })
                                            )
                                        }
                                    >
                                        Clear
                                    </StyledButton>
                                </StyledToolbar>
                            </StyledFormFlex>
                        </StyledFormFieldset>
                        <StyledFormFieldset
                            $isHidden={
                                openedActivityFilterOption !== "categories"
                            }
                        >
                            <legend>Categories</legend>
                            <StyledFormFlex>
                                <StyledFormSection>
                                    <label htmlFor="categories">
                                        Select one or more categories
                                    </label>
                                    <StyledToolbar>
                                        {categories.map((category) => (
                                            <StyledButton
                                                as="label"
                                                key={category._id}
                                                $isActive={temporaryActivityFilterConfiguration.categories.includes(
                                                    category._id
                                                )}
                                                $categoryColor={category.color}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="categories"
                                                    value={category._id}
                                                    hidden
                                                    checked={temporaryActivityFilterConfiguration.categories.includes(
                                                        category._id
                                                    )}
                                                    onChange={(event) =>
                                                        setTemporaryActivityFilterConfiguration(
                                                            (prev) => ({
                                                                ...prev,
                                                                categories:
                                                                    event.target
                                                                        .checked
                                                                        ? [
                                                                              ...prev.categories,
                                                                              category._id,
                                                                          ]
                                                                        : prev.categories.filter(
                                                                              (
                                                                                  id
                                                                              ) =>
                                                                                  id !==
                                                                                  category._id
                                                                          ),
                                                            })
                                                        )
                                                    }
                                                />
                                                {category.name}
                                            </StyledButton>
                                        ))}
                                    </StyledToolbar>
                                </StyledFormSection>
                                <StyledCheckboxAndLabelWrap>
                                    <input
                                        type="checkbox"
                                        id="categoriesEvery"
                                        name="categoriesEvery"
                                        value="1"
                                        checked={
                                            temporaryActivityFilterConfiguration.categoriesEvery
                                        }
                                        onChange={(event) =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    categoriesEvery:
                                                        event.target.checked,
                                                })
                                            )
                                        }
                                    />
                                    <label htmlFor="categoriesEvery">
                                        Only show activities that include{" "}
                                        <strong>all</strong> selected categories
                                    </label>
                                </StyledCheckboxAndLabelWrap>
                                <StyledToolbar $isLast>
                                    <StyledButton
                                        type="button"
                                        onClick={() =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    categories: [],
                                                    categoriesEvery: false,
                                                })
                                            )
                                        }
                                    >
                                        Clear
                                    </StyledButton>
                                </StyledToolbar>
                            </StyledFormFlex>
                        </StyledFormFieldset>
                        <StyledFormFieldset
                            $isHidden={openedActivityFilterOption !== "country"}
                        >
                            <legend>Country</legend>
                            <StyledFormFlex>
                                <StyledFormSection>
                                    <label htmlFor="country">
                                        Select one or more countries
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={
                                            temporaryActivityFilterConfiguration.country
                                        }
                                        multiple
                                        size={5}
                                        onChange={(event) =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    country: Array.from(
                                                        event.target
                                                            .selectedOptions
                                                    ).map(
                                                        (option) => option.value
                                                    ),
                                                })
                                            )
                                        }
                                    >
                                        {getCountries()
                                            .filter((country) =>
                                                uniqueCountriesUsed.has(
                                                    country.code
                                                )
                                            )
                                            .map((country) => (
                                                <option
                                                    key={country.code}
                                                    value={country.code}
                                                >
                                                    {country.name}
                                                </option>
                                            ))}
                                    </select>
                                </StyledFormSection>
                                <StyledToolbar $isLast>
                                    <StyledButton
                                        type="button"
                                        onClick={() =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    country: [],
                                                })
                                            )
                                        }
                                    >
                                        Clear
                                    </StyledButton>
                                </StyledToolbar>
                            </StyledFormFlex>
                        </StyledFormFieldset>
                        <StyledFormFieldset
                            $isHidden={openedActivityFilterOption !== "area"}
                        >
                            <legend>Area</legend>

                            <StyledFormFlex>
                                <StyledFormSection>
                                    <label htmlFor="area">
                                        Search text inside the area
                                    </label>
                                    <input
                                        type="text"
                                        id="area"
                                        name="area"
                                        value={
                                            temporaryActivityFilterConfiguration.area
                                        }
                                        onChange={(event) =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    area: event.target.value,
                                                })
                                            )
                                        }
                                    />
                                </StyledFormSection>
                                <StyledToolbar $isLast>
                                    <StyledButton
                                        type="button"
                                        onClick={() =>
                                            setTemporaryActivityFilterConfiguration(
                                                (prev) => ({
                                                    ...prev,
                                                    area: "",
                                                })
                                            )
                                        }
                                    >
                                        Clear
                                    </StyledButton>
                                </StyledToolbar>
                            </StyledFormFlex>
                        </StyledFormFieldset>
                        <StyledToolbar $isLast $alignRight>
                            <StyledButton
                                type="submit"
                                disabled={
                                    JSON.stringify(
                                        temporaryActivityFilterConfiguration
                                    ) ===
                                    JSON.stringify(activityFilterConfiguration)
                                }
                            >
                                Apply
                            </StyledButton>
                            <StyledButton
                                type="button"
                                onClick={onActivityFilterReset}
                            >
                                Reset
                            </StyledButton>
                        </StyledToolbar>
                    </StyledFormFlex>
                </StyledFormFieldset>
            </form>
        </StyledFormWrap>
    );
}
