import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const StyledToast = styled.div`
    background: ${(props) =>
        props.$color === "danger"
            ? "var(--accent-error-300)"
            : "var(--accent-success-100)"};

    border-radius: var(--border-radius-small);
    border: var(--border-small);
    padding: var(--eight-grid__s) var(--eight-grid__normal);
    border-color: ${(props) =>
        props.$color === "danger"
            ? "var(--accent-error-500)"
            : "var(--accent-success-300)"};

    font-weight: bold;

    animation: ${slideUp} 0.3s ease-out;
`;
