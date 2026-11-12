import { useState } from "react";

import NewBeeIcon from "@/components/icons/BeeIcon/newbee";

import { StyledBookmarkButton } from "./BookmarkButton.styled";

interface Props {
	onBookmarkToggle: (id: string) => void;
	id: string;
	bookmarkedActivityIds: string[];
}

export default function BookmarkButton({ onBookmarkToggle, id, bookmarkedActivityIds }: Props) {
	const isFavorite = bookmarkedActivityIds?.includes(id);
	const [isAnimating, setIsAnimating] = useState(false);

	function handleBookmarkButtonClick(id: string) {
		onBookmarkToggle(id);
		setIsAnimating(true);
		setTimeout(() => {
			setIsAnimating(false);
		}, 500);
	}

	return (
		<StyledBookmarkButton
			aria-label={isFavorite ? "Remove bookmark" : "Add bookmark"}
			onClick={() => handleBookmarkButtonClick(id)}
		>
			<NewBeeIcon
				className={isAnimating ? "isAnimating" : ""}
				bodyColor={isFavorite ? "var(--main-500)" : "var(--gray-300)"}
				size={50}
				isFavorite={isFavorite}
			/>
		</StyledBookmarkButton>
	);
}
