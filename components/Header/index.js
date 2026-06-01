import { StyledHeading } from "./Header.styled";

export default function Header({ title = "Activity Planner" }) {
    return (
        <header>
            <StyledHeading>{title}</StyledHeading>
        </header>
    );
}
