import { StyledHeading } from "./Header.styled";

export default function Header({ title = "ActiviBee" }) {
    return (
        <header>
            <StyledHeading>{title}</StyledHeading>
        </header>
    );
}
