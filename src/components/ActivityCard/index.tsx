import type { Category } from "@/types";

import {
	StyledActivityHeadline,
	StyledCardImage,
	StyledCardImageWrapper,
	StyledCategoryList,
	StyledCategoryTag,
	StyledFigcaption,
	StyledFigure,
	StyledLink,
} from "./ActivityCard.styled";

interface Props {
	title: string;
	categories: Category[];
	image?: string;
	id: string;
}

export default function ActivityCard({ title, categories, image, id }: Props) {
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
							<StyledCategoryTag key={category._id} $categoryColor={category.color}>
								{category.abbreviation}
							</StyledCategoryTag>
						))}
					</StyledCategoryList>
				</StyledFigcaption>
			</StyledFigure>
		</StyledLink>
	);
}
