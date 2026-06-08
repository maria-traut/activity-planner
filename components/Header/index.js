import { StyledHeading, StyledHeader } from "./Header.styled";

export default function Header({ title = "ActiviBee", children }) {
    return (
        <StyledHeader>
            <StyledHeading>{title}</StyledHeading>
            {children}
        </StyledHeader>
    );
}
