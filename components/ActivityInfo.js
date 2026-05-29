import Image from "next/image";
import styled from "styled-components";
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

const StyledActivityInfoContainer = styled.section`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
`;

const StyledImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const StyledLocations = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
  position: absolute;
  display: flex;
  gap: 0.5rem;
  top: 0.5rem;

  z-index: 2;

  li {
    text-align: center;
    background-color: #e0f0ff;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 0.8rem;
  }
`;

const StyledCategories = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  gap: 0.5rem;

  margin-top: 2rem;

  li {
    text-align: center;

    background-color: #e0f0ff;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 0.8rem;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
`;
