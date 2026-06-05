import NewBeeIcon from "@/components/BeeIcon/newbee";
import styled from "styled-components";

export default function Loading() {
    return (
        <StyledSplashContainer>
            <StyledBeeIcon bodyColor="white" />
            <StyledSplashText>ActiviBee</StyledSplashText>
        </StyledSplashContainer>
    );
}

const StyledSplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const StyledBeeIcon = styled(NewBeeIcon)`
    width: 150px;
    height: 150px;
    @media (prefers-color-scheme: dark) {
        filter: drop-shadow(0 0 8px #f8edcb);
    }
`;

const StyledSplashText = styled.p`
    font-size: 2rem;
`;
