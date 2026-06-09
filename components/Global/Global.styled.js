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
    padding: var(--spacing-normal);
`;

export const StyledToolbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ $alignRight }) => ($alignRight ? "right" : "left")};
    flex-wrap: wrap;
    gap: var(--eight-grid__normal);
    align-items: center;
    padding: ${({ $isLast }) => ($isLast ? "var(--spacing-normal) 0 0" : "0")};
`;

export const StyledButton = styled.button`
    border-radius: var(--border-radius-normal);
    border: var(--border-small);
    padding: var(--eight-grid__s) var(--eight-grid__normal);
    background-color: ${({ $isOpen, $isActive, $categoryColor }) =>
        $isOpen
            ? "lightgray"
            : $isActive
              ? "lightgoldenrodyellow"
              : $categoryColor || "var(--gray-100)"};

    &:hover {
        background-color: var(--gray-200);
    }

    &:disabled {
        border-color: var(--gray-300);
        color: var(--gray-300);
    }
    html.dark & {
        background-color: ${({ $isOpen, $isActive, $categoryColor }) =>
            $isOpen
                ? "var(--gray-200)"
                : $isActive
                  ? "var(--main-300)"
                  : $categoryColor || "var(--gray-900)"};

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

    html.dark & {
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
    html.dark & {
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

    html.dark & {
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
    align-items: center;
    flex-wrap: nowrap;

    gap: 0;
    aspect-ratio: 1 / 1;
    padding: var(--eight-grid__s);

    @media only screen and (min-width: 600px) {
        gap: var(--spacing-small);
        aspect-ratio: auto;
        padding: var(--eight-grid__s) var(--eight-grid__normal);
    }
    html.dark & {
        color: var(--gray-100);
        background-color: ${({ $isOpen, $isActive, $categoryColor }) =>
            $isOpen
                ? "var(--gray-200)"
                : $isActive
                  ? "var(--main-300)"
                  : $categoryColor || "var(--gray-900)"};

        &:hover {
            background-color: var(--gray-800);
        }

        &:disabled {
            border-color: var(--gray-700);
            color: var(--gray-700);
        }
    }
`;

export const StyledButtonWithIconText = styled.div`
    display: none;

    @media only screen and (min-width: 600px) {
        display: block;
    }
`;

export const StyledButtonWithIconIcon = styled.span`
    height: var(--text-line-height);
    display: flex;
    align-items: center;

    img {
        height: 100%;
        width: auto;

        @media only screen and (min-width: 600px) {
            height: 1em;
        }
    }
    span {
        font-size: var(--text-font-size-normal);
        line-height: 1.5em;
        width: auto;
    }
    html.dark & {
        img {
            filter: invert(1);
        }
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
