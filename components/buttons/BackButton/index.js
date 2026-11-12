import Link from "next/link";

import { StyledButtonBlue } from "@/components/Global/Global.styled";

export default function BackButton() {
	return (
		<StyledButtonBlue as={Link} href="/">
			&#8619; Back
		</StyledButtonBlue>
	);
}
