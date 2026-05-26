import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ActivityCard({ image, title, categories, id }) {
  return (
    <figure>
      <Link href={`/activities/${id}`}>
        <Image src={image} alt={title} width={500} height={500} />
      </Link>
      <StyledFigcaption>
        <h2>{title}</h2>
        <StyledCategoryList>
          {categories.map((category) => (
            <StyledCategoryTag key={category._id}>{category}</StyledCategoryTag>
          ))}
        </StyledCategoryList>
      </StyledFigcaption>
    </figure>
  );
}

const StyledFigcaption = styled.figcaption`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const StyledCategoryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 8px;
`;

const StyledCategoryTag = styled.li`
  display: inline-block;
  background-color: #e0f0ff;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.8rem;
`;
