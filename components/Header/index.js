import { StyledHeading, StyledHeader } from "./Header.styled";

export default function Header({ title = "ActiviBee" }) {
    return (
        <StyledHeader>
            <StyledHeading>{title}</StyledHeading>
        </StyledHeader>
    );
}
