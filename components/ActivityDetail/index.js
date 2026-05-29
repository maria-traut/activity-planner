import {
  StyledActivityInfoContainer,
  StyledImageContainer,
  StyledLocations,
  StyledCategories,
  StyledImage,
} from "./ActivityDetail.styled";
import { getCountryName } from "@/lib/countries";

export default function ActivityDetail({ activity }) {
  return (
    <>
      <StyledActivityInfoContainer>
        <StyledImageContainer>
          <StyledImage
            src={activity.imageUrl ? activity.imageUrl : "/placeholder.jpg"}
            width={600}
            height={400}
            alt={`Picture showing ${activity.title}`}
            objectFit="cover"
            priority
          />
          {activity.title && <h2>{activity.title}</h2>}
          {(activity.area || activity.country) && (
            <StyledLocations>
              {activity.area && <li>{activity.area}</li>}
              {activity.country && <li>{getCountryName(activity.country)}</li>}
            </StyledLocations>
          )}
          {activity.categories && (
            <StyledCategories>
              {activity.categories.map((category) => {
                return <li key={category._id}> {category.name} </li>;
              })}
            </StyledCategories>
          )}
        </StyledImageContainer>
        {activity.description && <article>{activity.description}</article>}
      </StyledActivityInfoContainer>
    </>
  );
}
