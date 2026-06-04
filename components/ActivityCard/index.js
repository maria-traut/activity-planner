import {
    StyledLink,
    StyledFigure,
    StyledCardImageWrapper,
    StyledCardImage,
    StyledFigcaption,
    StyledActivityHeadline,
    StyledCategoryList,
    StyledCategoryTag,
} from "./ActivityCard.styled";

export default function ActivityCard({ title, categories, image, id }) {
    return (
        <StyledLink href={`/${id}`}>
            <StyledFigure>
                <StyledCardImageWrapper>
                    <StyledCardImage
                        src={image ? image : "/placeholder.jpg"}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </StyledCardImageWrapper>
                <StyledFigcaption>
                    <StyledActivityHeadline>{title}</StyledActivityHeadline>
                    <StyledCategoryList>
                        {categories.map((category) => (
                            <StyledCategoryTag
                                key={category._id}
                                $categoryColor={category.color}
                            >
                                {category.name}
                            </StyledCategoryTag>
                        ))}
                    </StyledCategoryList>
                </StyledFigcaption>
            </StyledFigure>
        </StyledLink>
    );
}
