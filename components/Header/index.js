import {
    StyledHeading,
    StyledHeader,
    StyledStickyToolbar,
} from "./Header.styled";

export default function Header({ title = "ActiviBee", children }) {
    return (
        <>
            <StyledHeader>
                <StyledHeading>{title}</StyledHeading>
            </StyledHeader>
            {children && <StyledStickyToolbar>{children}</StyledStickyToolbar>}
        </>
    );
}
