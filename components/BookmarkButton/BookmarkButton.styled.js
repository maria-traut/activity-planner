import styled from "styled-components";
import { StyledButton } from "../Global/Global.styled";

export const StyledBookmarkButton = styled.button`
    all: unset;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    background: var(--bookmark-button-color1);

    &:hover {
        background-color: var(--bookmark-button-color2);
    }
`;
