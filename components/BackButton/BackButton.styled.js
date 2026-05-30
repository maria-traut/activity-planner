import styled from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
    text-decoration: none;
    border-radius: 10px;
    border: 1px solid #0000ee;
    color: #0000ee;
    background: white;
    padding: 0.5em 1em;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
    &:active {
        color: #0000ee;
    }
`;
