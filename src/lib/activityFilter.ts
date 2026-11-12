export interface ActivityFilterConfiguration {
	title: string;
	categories: string[];
	country: string[];
	area: string;
	categoriesEvery: boolean;
}

export const defaultActivityFilterConfiguration: ActivityFilterConfiguration = {
	title: "",
	categories: [],
	country: [],
	area: "",
	categoriesEvery: false,
};

export const activityFilterLabels: { value: keyof ActivityFilterConfiguration; label: string }[] = [
	{ value: "title", label: "Title" },
	{ value: "categories", label: "Categories" },
	{ value: "country", label: "Country" },
	{ value: "area", label: "Area" },
];
