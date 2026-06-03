import styled from "styled-components";

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

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    border-radius: var(--border-radius-normal);
    border: var(--border-small);
    padding: var(--spacing-small) var(--spacing-normal);

    &:hover {
        background-color: var(--gray-200);
    }

    &:disabled {
        border-color: var(--gray-300);
        color: var(--gray-300);
    }

    @media (prefers-color-scheme: dark) {
        &:hover {
            background-color: var(--gray-800);
        }

        &:disabled {
            border-color: var(--gray-700);
            color: var(--gray-700);
        }
    }
`;
