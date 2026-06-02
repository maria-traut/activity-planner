import { StyledHeading, StyledHeader } from "./Header.styled";

export default function Header({ title = "🐝" }) {
    return (
        <StyledHeader>
            <StyledHeading>{title}</StyledHeading>
        </StyledHeader>
    );
}
