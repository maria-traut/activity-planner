import BeeIcon from "@/components/BeeIcon";
import NewBeeIcon from "@/components/BeeIcon/newbee";
import styled from "styled-components";

export default function Loading() {
    return (
        <StyledSplashContainer>
            <StyledBeeIcon width={100} height={100} />
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
`;

const StyledSplashText = styled.p`
    font-size: 2rem;
`;
