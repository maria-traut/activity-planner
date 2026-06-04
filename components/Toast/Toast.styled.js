import styled from "styled-components";

export const StyledToast = styled.div`
    background: ${(props) =>
        props.$color === "danger"
            ? "var(--accent-error-300)"
            : "var(--accent-success-100)"};

    padding: 1rem;
    border-radius: 4px;
    font-weight: bold;
`;
