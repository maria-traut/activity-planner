import styled from "styled-components";

export const StyledFormWrap = styled.section`
    padding: 0 var(--spacing-normal);
`;

export const StyledFormSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-small);
`;

export const StyledFormFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-normal);
`;

export const StyledFormFieldset = styled.fieldset`
    padding: var(--spacing-normal);
    border-radius: var(--border-radius-normal);
`;

export const StyledCheckboxAndLabelWrap = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    align-items: center;
    padding: var(--spacing-small) 0 0;
`;
