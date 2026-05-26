import Image from "next/image";
import styled from "styled-components";

export default function ActivityCard({ title, categories }) {
  return (
    <StyledFigure>
      <StyledImageWrapper>
        <Image
          src="/placeholder.jpg"
          alt={title}
          fill
          // sizes for better image component performance, from next.js/docs
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </StyledImageWrapper>
      <StyledFigcaption>
        <h2>{title}</h2>
        <StyledCategoryList>
          {categories.map((category) => (
            <StyledCategoryTag key={category._id}>
              {category.name}
            </StyledCategoryTag>
          ))}
        </StyledCategoryList>
      </StyledFigcaption>
    </StyledFigure>
  );
}

const StyledFigure = styled.figure`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 400px;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100 %;
  aspect-ratio: 16 / 9;
`;

const StyledFigcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const StyledCategoryList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
`;

const StyledCategoryTag = styled.li`
  display: inline-block;
  background-color: #e0f0ff;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.8rem;
`;
