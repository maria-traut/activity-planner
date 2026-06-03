import { StyledHeading, StyledHeader } from "./Header.styled";
import NewBeeIcon from "../BeeIcon/newbee";

export default function Header({ title = "ActiviBee" }) {
    return (
        <StyledHeader>
            <StyledHeading>{title}</StyledHeading>
        </StyledHeader>
    );
}
