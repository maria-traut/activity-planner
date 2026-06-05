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
    padding: 0 var(--eight-grid__s);
    background-color: var(--main-400);
    border-bottom: solid;
    border-width: 1px;
    border-color: var(--main-600);

    position: sticky;
    top: 50px;
    width: 100%;
    z-index: 5;
`;

export const StyledToolbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: var(--eight-grid__normal);
    align-items: center;
`;

export const StyledButton = styled.button`
    border-radius: var(--border-radius-normal);
    border: var(--border-small);
    padding: var(--eight-grid__s) var(--eight-grid__normal);
    background-color: var(--gray-100);

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

export const StyledButtonWithIcon = styled(StyledButton)`
    display: flex;
    flex-direction: row;
    gap: var(--spacing-small);
    align-items: center;
`;

export const StyledButtonIcon = styled.span`
    img {
        height: 1rem;
        width: auto;
    }
`;

export const StyledStatusMessageWrap = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--eight-grid__normal);
    padding: var(--eight-grid__normal);
    align-items: center;
`;

export const StyledStatusMessage = styled.p`
    padding: var(--eight-grid__s) 0em;
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
