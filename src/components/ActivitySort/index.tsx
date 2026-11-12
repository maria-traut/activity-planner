import { type FormEvent, useState } from "react";

import {
	StyledFormFieldset,
	StyledFormFieldsetCleanedUp,
	StyledFormFlex,
	StyledFormSection,
	StyledFormWrap,
} from "@/components/ActivityForm/ActivityForm.styled";
import { StyledButton, StyledToolbar } from "@/components/Global/Global.styled";
import { activitySortOptions, type ActivitySortOrder } from "@/lib/activitySort";

interface Props {
	onActivitySortApply: (event: FormEvent<HTMLFormElement>) => void;
	onActivitySortReset: () => void;
	activitySortConfiguration: ActivitySortOrder;
}

export default function ActivitySort({
	onActivitySortApply,
	onActivitySortReset,
	activitySortConfiguration,
}: Props) {
	const [temporaryActivitySortConfiguration, setTemporaryActivitySortConfiguration] =
		useState(activitySortConfiguration);

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
										<label key={option.value} htmlFor={`order-${option.value}`}>
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
														option.value,
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
									.filter((option) => option.group === "title")
									.map((option) => (
										<label key={option.value} htmlFor={`order-${option.value}`}>
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
														option.value,
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
								JSON.stringify(temporaryActivitySortConfiguration) ===
								JSON.stringify(activitySortConfiguration)
							}
						>
							Apply
						</StyledButton>
						<StyledButton type="button" onClick={onActivitySortReset}>
							Reset
						</StyledButton>
					</StyledToolbar>
				</StyledFormFieldset>
			</form>
		</StyledFormWrap>
	);
}
