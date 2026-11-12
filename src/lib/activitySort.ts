import type { Activity } from "@/types";

export type ActivitySortOrder = "newest" | "oldest" | "lastModified" | "az" | "za";

export const defaultActivitySortConfiguration: ActivitySortOrder = "newest";

export const activitySortOptions: { value: ActivitySortOrder; label: string; group: string }[] = [
	{ value: "newest", label: "Newest", group: "date" },
	{ value: "oldest", label: "Oldest", group: "date" },
	{ value: "lastModified", label: "Recently Updated", group: "date" },
	{ value: "az", label: "A to Z", group: "title" },
	{ value: "za", label: "Z to A", group: "title" },
];

export function getActivitySortLabel(order: ActivitySortOrder) {
	return activitySortOptions.find((option) => option.value === order)?.label;
}

export function getSortedActivities(activities: Activity[] = [], sortOrder: ActivitySortOrder) {
	return [...activities].sort((a, b) => {
		if (sortOrder === "az") {
			return a.title.localeCompare(b.title);
		}

		if (sortOrder === "za") {
			return b.title.localeCompare(a.title);
		}

		if (sortOrder === "lastModified") {
			return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
		}

		if (sortOrder === "newest") {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}

		if (sortOrder === "oldest") {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		}

		return 0;
	});
}
