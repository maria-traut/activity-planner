import Image from "next/image";
import {
    StyledLink,
    StyledFigure,
    StyledImageWrapper,
    StyledFigcaption,
    StyledActivityHeadline,
    StyledCategoryList,
    StyledCategoryTag,
} from "./ActivityCard.styled";

export default function ActivityCard({ title, categories, image, id }) {
    return (
        <StyledLink href={`/${id}`}>
            <StyledFigure>
                <StyledImageWrapper>
                    <Image
                        src={image ? image : "/placeholder.jpg"}
                        alt={title}
                        fill
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
