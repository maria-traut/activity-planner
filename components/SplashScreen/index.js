import {
    StyledSplashContainer,
    StyledSplashText,
    StyledBeeIcon,
} from "./SplashScreen.styled";

export default function SplashScreen() {
    return (
        <StyledSplashContainer>
            <StyledBeeIcon bodyColor="white" />
            <StyledSplashText>ActiviBee</StyledSplashText>
        </StyledSplashContainer>
    );
}
