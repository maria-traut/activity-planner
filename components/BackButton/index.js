import { StyledButtonBlue } from "../Global/Global.styled";
import Link from "next/link";

export default function BackButton() {
    return (
        <StyledButtonBlue as={Link} href="/">
            &#8619; Back
        </StyledButtonBlue>
    );
}
