import styled from "styled-components";
import NewBeeIcon from "@/components/icons/BeeIcon/newbee";
import { KeyframesFadeOut } from "@/components/Global/Global.styled";

export const StyledSplashContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;
`;

export const StyledBeeIcon = styled(NewBeeIcon)`
    width: 150px;
    height: 150px;

    @media (prefers-color-scheme: dark) {
        filter: drop-shadow(0 0 8px #f8edcb);
    }
    html.dark:not(.system) & {
        filter: drop-shadow(0 0 8px #f8edcb);
    }
`;

export const StyledSplashText = styled.p`
    font-size: 2rem;
`;
