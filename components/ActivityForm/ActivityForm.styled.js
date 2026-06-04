import styled from "styled-components";

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
`;
