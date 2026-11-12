import type { Dispatch, SetStateAction } from "react";

export interface Category {
	_id: string;
	name: string;
	color: string;
	abbreviation: string;
}

export interface Activity {
	_id: string;
	title: string;
	imageUrl?: string;
	categories: Category[];
	description?: string;
	area?: string;
	country?: string;
	createdAt: string;
	updatedAt: string;
}

export interface ActivityFormStatus {
	type: "" | "success" | "error";
	message: string;
}

export interface AppPageProps {
	navbarLocation: string;
	onNavbarLocation: (location: string) => void;
	bookmarkedActivityIds: string[];
	handleBookmarkToggle: (id: string) => void;
	onBookmarkedActivityIdsDelete: (id: string) => void;
	isCreateActivityMode: boolean;
	setIsCreateActivityMode: Dispatch<SetStateAction<boolean>>;
	activityFormStatus: ActivityFormStatus;
	setActivityFormStatus: Dispatch<SetStateAction<ActivityFormStatus>>;
}
