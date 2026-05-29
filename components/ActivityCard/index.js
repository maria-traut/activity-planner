import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ActivityCard({ title, categories, image, id }) {
  return (
    <StyledLink href={`/${id}`}>
      <StyledFigure>
        <StyledImageWrapper>
          <Image
            src={image ? image : "/placeholder.jpg"}
            alt={title}
            fill
            // sizes for better image component performance, from next.js/docs
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectFit="cover"
            priority
          />
        </StyledImageWrapper>
        <StyledFigcaption>
          <StyledActivityHeadline>{title}</StyledActivityHeadline>
          <StyledCategoryList>
            {categories.map((category) => (
              <StyledCategoryTag key={category._id}>
                {category.name}
              </StyledCategoryTag>
            ))}
          </StyledCategoryList>
        </StyledFigcaption>
      </StyledFigure>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`;

const StyledFigure = styled.figure`
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 270px;
  overflow: hidden;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
`;

const StyledFigcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.1rem;
  padding: 0.5rem 1rem 1rem 1rem;
`;

const StyledActivityHeadline = styled.h2`
  font-size: 1.25rem;
  line-height: 1.3;
  text-align: center;
  padding: 0;
  margin: 0.7rem;
`;

const StyledCategoryList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
  flex-wrap: wrap;
`;

const StyledCategoryTag = styled.li`
  display: inline-block;
  background-color: #e0f0ff;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.8rem;
`;
