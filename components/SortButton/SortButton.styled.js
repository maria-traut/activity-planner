import styled from "styled-components";
import { StyledButton } from "../Global/Global.styled";

export const StyledFormFieldset = styled.fieldset`
    padding: 1rem;
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
    top: var(--spacing-small);
    right: var(--spacing-small);
    padding: 2px 4px;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 3;
`;
