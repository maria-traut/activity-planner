import type { ReactNode } from "react";

import { StyledHeader, StyledHeading, StyledStickyToolbar } from "./Header.styled";

interface Props {
	title?: string;
	children?: ReactNode;
}

export default function Header({ title = "ActiviBee", children }: Props) {
	return (
		<>
			<StyledHeader>
				<StyledHeading>{title}</StyledHeading>
			</StyledHeader>
			{children && <StyledStickyToolbar>{children}</StyledStickyToolbar>}
		</>
	);
}
