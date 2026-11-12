import { type Dispatch, type FormEvent, type SetStateAction, useEffect } from "react";
import useSWR from "swr";

import { StyledButton, StyledToolbar } from "@/components/Global/Global.styled";
import showToast from "@/components/Toast";
import { getCountries } from "@/lib/countries";
import { handleImageUrlValidation } from "@/lib/imageUrlValidation";
import type { Activity, ActivityFormStatus, Category } from "@/types";

import {
	StyledCheckboxAndLabelWrap,
	StyledFormFieldset,
	StyledFormFlex,
	StyledFormSection,
	StyledFormWrap,
} from "./ActivityForm.styled";

interface Props {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	status: ActivityFormStatus;
	heading: string;
	submitLabel: string;
	setStatus: Dispatch<SetStateAction<ActivityFormStatus>>;
	activity?: Activity;
	isEditActivityMode?: boolean;
	setIsEditActivityMode?: Dispatch<SetStateAction<boolean>>;
	isCreateActivityMode?: boolean;
	setIsCreateActivityMode?: Dispatch<SetStateAction<boolean>>;
}

export default function ActivityForm({
	onSubmit,
	status,
	heading,
	submitLabel,
	setStatus,
	activity,
	isEditActivityMode,
	setIsEditActivityMode,
	isCreateActivityMode,
	setIsCreateActivityMode,
}: Props) {
	const {
		data: categories,
		isLoading: categoriesLoading,
		error: categoriesError,
	} = useSWR<Category[]>("/api/categories");

	const isLoading = categoriesLoading;
	const hasError = categoriesError;

	useEffect(() => {
		if (status.type === "error") {
			showToast(status.message, "danger");
			setStatus({
				type: "",
				message: "",
			});
		}
	}, [status.type, status.message, setStatus]);

	if (isLoading) {
		return (
			<StyledFormWrap>
				<form>
					<StyledFormFieldset>
						<legend>{heading}</legend>
						<p>Loading categories...</p>
					</StyledFormFieldset>
				</form>
			</StyledFormWrap>
		);
	}

	if (hasError || !categories) {
		return (
			<StyledFormWrap>
				<form>
					<StyledFormFieldset>
						<legend>{heading}</legend>
						<p>An error occured while fetching categories.</p>
					</StyledFormFieldset>
				</form>
			</StyledFormWrap>
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
								onBlur={(event) => handleImageUrlValidation(event.target)}
								defaultValue={
									activity?.imageUrl
										? activity?.imageUrl !== "/placeholder.jpg"
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
						{isCreateActivityMode && (
							<StyledCheckboxAndLabelWrap>
								<input
									type="checkbox"
									id="addToBookmarks"
									name="addToBookmarks"
									value="1"
								/>
								<label htmlFor="addToBookmarks">Add to my activity bookmarks</label>
							</StyledCheckboxAndLabelWrap>
						)}
						<StyledToolbar $isLast $alignRight>
							<StyledButton type="submit" disabled={status.type === "success"}>
								{submitLabel}
							</StyledButton>
							{(isCreateActivityMode || isEditActivityMode) && (
								<StyledButton
									type="button"
									onClick={() =>
										isCreateActivityMode
											? setIsCreateActivityMode?.(false)
											: setIsEditActivityMode?.(false)
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
