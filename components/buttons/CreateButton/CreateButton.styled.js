import styled from "styled-components";
import { StyledButton } from "@/components/Global/Global.styled";
export const StyledCreateButton = styled(StyledButton)`
    width: 45px;
    height: 45px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--main-500);
    border-color: var(--main-200);

    &:active {
        border-style: none;
        background-color: transparent;
        color: transparent;
    }
`;
