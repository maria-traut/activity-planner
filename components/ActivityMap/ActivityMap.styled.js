import styled from "styled-components";
import Link from "next/link";

export const StyledPopupTitle = styled.p`
    all: unset;
    font-size: var(--text-font-size-normal);
    font-weight: bold;
`;

export const StyledPopupCountry = styled.p`
    all: unset;
    font-size: var(--text-font-size-normal);
`;

export const StyledPopupLink = styled(Link)`
    color: blue;
    font-size: var(--text-font-size-small);
    text-decoration: underline;
    margin-top: 10px;
    display: block;
`;
