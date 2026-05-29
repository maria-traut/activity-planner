import {
  StyledActivityInfoContainer,
  StyledImageContainer,
  StyledLocations,
  StyledCategories,
  StyledImage,
} from "./ActivityInfo.styled";

export default function ActivityInfo({ activity }) {
  return (
    <>
      <StyledActivityInfoContainer>
        <h1>{activity.title}</h1>
        <StyledImageContainer>
          <StyledImage
            src={activity.imageUrl ? activity.imageUrl : "/placeholder.jpg"}
            width={600}
            height={400}
            alt={`Picture showing ${activity.title}`}
            objectFit="cover"
            priority
          />
          <StyledLocations>
            <li>{activity.area}</li>
            <li>{activity.country}</li>
          </StyledLocations>
        </StyledImageContainer>
        <article>{activity.description}</article>
        <StyledCategories>
          {activity.categories.map((category) => {
            return <li key={category._id}> {category.name} </li>;
          })}
        </StyledCategories>
      </StyledActivityInfoContainer>
    </>
  );
}
