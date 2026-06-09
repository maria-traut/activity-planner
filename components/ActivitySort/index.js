import { useState } from "react";
import { StyledToolbar, StyledButton } from "@/components/Global/Global.styled";
import {
    StyledFormWrap,
    StyledFormSection,
    StyledFormFieldset,
    StyledFormFlex,
    StyledFormFieldsetCleanedUp,
} from "@/components/ActivityForm/ActivityForm.styled";
import { activitySortOptions } from "@/lib/activitySort";

export default function ActivitySort({
    onActivitySortApply,
    onActivitySortReset,
    activitySortConfiguration,
}) {
    const [
        temporaryActivitySortConfiguration,
        setTemporaryActivitySortConfiguration,
    ] = useState(activitySortConfiguration);

    return (
        <StyledFormWrap>
            <form onSubmit={onActivitySortApply}>
                <StyledFormFieldset>
                    <legend>Sort Activities by</legend>
                    <StyledFormFlex>
                        <StyledFormFieldsetCleanedUp>
                            <legend>Date</legend>

                            <StyledFormSection>
                                {activitySortOptions
                                    .filter((option) => option.group === "date")
                                    .map((option) => (
                                        <label
                                            key={option.value}
                                            htmlFor={`order-${option.value}`}
                                        >
                                            <input
                                                type="radio"
                                                id={`order-${option.value}`}
                                                name="order"
                                                value={option.value}
                                                checked={
                                                    temporaryActivitySortConfiguration ===
                                                    option.value
                                                }
                                                onChange={() =>
                                                    setTemporaryActivitySortConfiguration(
                                                        option.value
                                                    )
                                                }
                                            />{" "}
                                            {option.label}
                                        </label>
                                    ))}
                            </StyledFormSection>
                        </StyledFormFieldsetCleanedUp>
                        <StyledFormFieldsetCleanedUp>
                            <legend>Title</legend>
                            <StyledFormSection>
                                {activitySortOptions
                                    .filter(
                                        (option) => option.group === "title"
                                    )
                                    .map((option) => (
                                        <label
                                            key={option.value}
                                            htmlFor={`order-${option.value}`}
                                        >
                                            <input
                                                type="radio"
                                                id={`order-${option.value}`}
                                                name="order"
                                                value={option.value}
                                                checked={
                                                    temporaryActivitySortConfiguration ===
                                                    option.value
                                                }
                                                onChange={() =>
                                                    setTemporaryActivitySortConfiguration(
                                                        option.value
                                                    )
                                                }
                                            />{" "}
                                            {option.label}
                                        </label>
                                    ))}
                            </StyledFormSection>
                        </StyledFormFieldsetCleanedUp>
                    </StyledFormFlex>
                    <StyledToolbar $isLast $alignRight>
                        <StyledButton
                            type="submit"
                            disabled={
                                JSON.stringify(
                                    temporaryActivitySortConfiguration
                                ) === JSON.stringify(activitySortConfiguration)
                            }
                        >
                            Apply
                        </StyledButton>
                        <StyledButton
                            type="button"
                            onClick={onActivitySortReset}
                        >
                            Reset
                        </StyledButton>
                    </StyledToolbar>
                </StyledFormFieldset>
            </form>
        </StyledFormWrap>
    );
}
