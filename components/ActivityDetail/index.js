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
import { getCountryName } from "@/lib/countries";

export default function ActivityDetail({ activity }) {
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
                        alt={`Picture showing ${activity.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
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
