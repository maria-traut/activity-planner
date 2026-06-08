import styled, { css } from "styled-components";

export const StyledFormWrap = styled.section`
    padding: 0 var(--eight-grid__normal);
    margin-top: var(--eight-grid__halfstep);
`;

export const StyledFormSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: var(--eight-grid__s);
`;

export const StyledFormFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--eight-grid__normal);
`;

export const StyledFormFieldset = styled.fieldset`
    padding: var(--eight-grid__s);
    border-radius: var(--border-radius-normal);
    ${({ $isHidden }) =>
        $isHidden &&
        css`
            display: none;
        `}
`;

export const StyledFormFieldsetCleanedUp = styled.fieldset`
    border: none;
    padding-left: 0;
`;

export const StyledCheckboxAndLabelWrap = styled.section`
    display: flex;
    flex-direction: row;
    gap: var(--spacing-small);
    align-items: normal;
    padding: var(--spacing-small) 0 0;

    input[type="checkbox"] {
        flex-shrink: 0;
    }
    label {
        padding-top: 0.25rem;
    }
`;
