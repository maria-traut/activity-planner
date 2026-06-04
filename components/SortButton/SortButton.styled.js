import styled from "styled-components";
import { StyledButton } from "../Global/Global.styled";

export const StyledFormFieldset = styled.fieldset`
    padding: var(--eight-grid__halfstep);
    border-radius: 10px;
`;

export const StyledFormWrap = styled.section`
    padding: 0 1rem;
`;

export const StyledFormSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const StyledSortButton = styled(StyledButton)`
    top: var(--eight-grid__s);
    right: var(--eight-grid__s);
    padding: 2px 4px;
    position: fixed;

    z-index: 4;
`;
