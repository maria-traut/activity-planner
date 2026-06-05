import styled from "styled-components";
import SplashScreen from ".";
import NewBeeIcon from "../BeeIcon/newbee";
import { KeyframesFadeOut } from "../Global/Global.styled";

export const StyledSplashScreen = styled(SplashScreen)`
    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;
`;

export const StyledSplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const StyledBeeIcon = styled(NewBeeIcon)`
    width: 150px;
    height: 150px;
    @media (prefers-color-scheme: dark) {
        filter: drop-shadow(0 0 8px #f8edcb);
    }
`;

export const StyledSplashText = styled.p`
    font-size: 2rem;
`;
