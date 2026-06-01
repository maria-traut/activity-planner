import {
    StyledActivityInfoContainer,
    StyledImageContainer,
    StyledLocations,
    StyledCategories,
    StyledImage,
    StyledImageLayerTop,
    StyledImageLayerBottom,
    StyledActivityDetailTitle,
    StyledActivityDetailDescriptionWrap,
} from "./ActivityDetail.styled";
import BookmarkButton from "../BookmarkButton";
import { getCountryName } from "@/lib/countries";

export default function ActivityDetail({
    activity,
    handleBookmarkToggle,
    bookmarkedActivityIds,
}) {
    return (
        <>
            <StyledActivityInfoContainer>
                <StyledImageContainer>
                    <StyledImage
                        src={
                            activity.imageUrl
                                ? activity.imageUrl
                                : "/placeholder.jpg"
                        }
                        width={1200}
                        height={800}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        alt={`Picture showing ${activity.title}`}
                        objectFit="cover"
                        priority
                    />
                    <StyledImageLayerTop>
                        {(activity.area || activity.country) && (
                            <StyledLocations>
                                {activity.area && <li>{activity.area}</li>}
                                {activity.country && (
                                    <li>{getCountryName(activity.country)}</li>
                                )}
                            </StyledLocations>
                        )}
                        {activity.title && (
                            <StyledActivityDetailTitle>
                                {activity.title}
                            </StyledActivityDetailTitle>
                        )}
                    </StyledImageLayerTop>
                    <StyledImageLayerBottom>
                        {activity.categories && (
                            <StyledCategories>
                                {activity.categories.map((category) => {
                                    return (
                                        <li key={category._id}>
                                            {category.name}
                                        </li>
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
                        <article>{activity.description}</article>
                    )}
                </StyledActivityDetailDescriptionWrap>
            </StyledActivityInfoContainer>
        </>
    );
}
