import styled from "styled-components";
import { StyledButton } from "@/components/Global/Global.styled";

export const StyledBackToTopButton = styled(StyledButton)`
    position: fixed;
    bottom: 85px;
    right: 20px;
    z-index: 10;
    font-size: 1.2rem;
    width: 45px;
    height: 45px;
    padding: 0;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
`;
