import ActivityCard from "@/components/ActivityCard";
import BookmarkButton from "@/components/buttons/BookmarkButton";
import { StyledStatusMessage, StyledStatusMessageWrap } from "@/components/Global/Global.styled";
import type { Activity } from "@/types";

import { StyledActivityCardContainer, StyledActivityList } from "./ActivityList.styled";

interface Props {
	activities: Activity[];
	isActivityFiltered: boolean;
	handleBookmarkToggle: (id: string) => void;
	bookmarkedActivityIds: string[];
	noActivitiesFoundMessage?: string;
	noFilteredActivitiesFoundMessage?: string;
}

export default function ActivityList({
	activities,
	isActivityFiltered,
	handleBookmarkToggle,
	bookmarkedActivityIds,
	noActivitiesFoundMessage = "No activities found.",
	noFilteredActivitiesFoundMessage = "No activities found for the selected filters.",
}: Props) {
	if (activities.length < 1 && isActivityFiltered) {
		return (
			<StyledStatusMessageWrap>
				<StyledStatusMessage>{noFilteredActivitiesFoundMessage}</StyledStatusMessage>
			</StyledStatusMessageWrap>
		);
	}
	if (activities.length < 1) {
		return (
			<StyledStatusMessageWrap>
				<StyledStatusMessage>{noActivitiesFoundMessage}</StyledStatusMessage>
			</StyledStatusMessageWrap>
		);
	}

	return (
		<StyledActivityList>
			{activities.map((activity) => (
				<li key={activity._id}>
					<StyledActivityCardContainer>
						<ActivityCard
							image={activity.imageUrl}
							title={activity.title}
							categories={activity.categories}
							id={activity._id}
						/>
						<BookmarkButton
							onBookmarkToggle={handleBookmarkToggle}
							id={activity._id}
							bookmarkedActivityIds={bookmarkedActivityIds}
						/>
					</StyledActivityCardContainer>
				</li>
			))}
		</StyledActivityList>
	);
}
