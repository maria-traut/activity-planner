import styled, { keyframes } from "styled-components";

export const KeyframesFadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    display:none;
  }
`;

export const StyledToolbarWrap = styled.section`
    padding: 0 var(--spacing-normal);
`;

export const StyledToolbar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-normal);
    align-items: center;
    padding: ${({ $isLast }) => ($isLast ? "var(--spacing-normal) 0 0" : "0")};
`;

export const StyledButton = styled.button`
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

export const StyledButtonBlue = styled(StyledButton)`
    color: var(--accent-link-500);
    border-color: var(--accent-link-500);

    &:hover {
        background-color: var(--accent-link-100);
    }

    @media (prefers-color-scheme: dark) {
        color: var(--accent-link-300);
        border-color: var(--accent-link-300);

        &:hover {
            background-color: var(--accent-link-800);
        }
    }
`;

export const StyledButtonRed = styled(StyledButton)`
    color: var(--accent-error-500);
    border-color: var(--accent-error-500);

    &:hover {
        background-color: var(--accent-error-100);
    }

    @media (prefers-color-scheme: dark) {
        color: var(--accent-error-300);
        border-color: var(--accent-error-300);

        &:hover {
            background-color: var(--accent-error-800);
        }
    }
`;

export const StyledButtonGreen = styled(StyledButton)`
    color: var(--accent-success-500);
    border-color: var(--accent-success-500);

    &:hover {
        background-color: var(--accent-success-100);
    }

    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;

    @media (prefers-color-scheme: dark) {
        color: var(--accent-success-300);
        border-color: var(--accent-success-300);

        &:hover {
            background-color: var(--accent-success-800);
        }
    }
`;

export const StyledStatusMessageWrap = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-normal);
    padding: 0 var(--spacing-normal);
    align-items: center;
`;

export const StyledStatusMessage = styled.p`
    padding: var(--spacing-small) 0em;
    margin: 0;
`;

export const StyledStatusMessageSuccess = styled(StyledStatusMessage)`
    color: var(--accent-success-500);

    opacity: 1;
    animation: ${KeyframesFadeOut} 1s ease forwards;
    animation-delay: 2s;
`;

export const StyledStatusMessageError = styled(StyledStatusMessage)`
    color: var(--accent-error-500);
`;
