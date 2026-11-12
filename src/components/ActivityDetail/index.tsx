import BookmarkButton from "@/components/buttons/BookmarkButton";
import { getCountryName } from "@/lib/countries";
import type { Activity } from "@/types";

import {
	StyledActivityDetailDescriptionWrap,
	StyledActivityInfoContainer,
	StyledCategories,
	StyledImage,
	StyledImageContainer,
	StyledImageLayerBottom,
	StyledImageLayerTop,
	StyledLocations,
	StyledTagElement,
} from "./ActivityDetail.styled";

interface Props {
	activity: Activity;
	handleBookmarkToggle: (id: string) => void;
	bookmarkedActivityIds: string[];
}

export default function ActivityDetail({
	activity,
	handleBookmarkToggle,
	bookmarkedActivityIds,
}: Props) {
	return (
		<>
			<StyledActivityInfoContainer>
				<StyledImageContainer>
					<StyledImage
						src={activity.imageUrl ? activity.imageUrl : "/placeholder.jpg"}
						alt={`Picture showing ${activity.title}`}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
						priority
					/>
					<StyledImageLayerTop>
						{(activity.area || activity.country) && (
							<StyledLocations>
								{activity.area && (
									<StyledTagElement>{activity.area}</StyledTagElement>
								)}
								{activity.country && (
									<StyledTagElement>
										{getCountryName(activity.country)}
									</StyledTagElement>
								)}
							</StyledLocations>
						)}
					</StyledImageLayerTop>
					<StyledImageLayerBottom>
						{activity.categories && (
							<StyledCategories>
								{activity.categories.map((category) => {
									return (
										<StyledTagElement
											key={category._id}
											$categoryColor={category.color}
										>
											{category.name}
										</StyledTagElement>
									);
								})}
							</StyledCategories>
						)}
					</StyledImageLayerBottom>
					<BookmarkButton
						onBookmarkToggle={handleBookmarkToggle}
						id={activity._id}
						bookmarkedActivityIds={bookmarkedActivityIds}
					/>
				</StyledImageContainer>
				<StyledActivityDetailDescriptionWrap>
					{activity.description && (
						<article>
							<p>{activity.description}</p>
						</article>
					)}
				</StyledActivityDetailDescriptionWrap>
			</StyledActivityInfoContainer>
		</>
	);
}
