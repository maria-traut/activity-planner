import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:visited {
        color: inherit;
    }
`;

export const StyledFigure = styled.figure`
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px hsla(0, 0%, 0%, 0.3);
    width: 100%;
    margin: 0;
    height: 100%;
`;

export const StyledCardImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 220px;
`;

export const StyledCardImage = styled(Image)`
    object-fit: cover;
`;

export const StyledFigcaption = styled.figcaption`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
`;

export const StyledActivityHeadline = styled.h2`
    font-size: 1.25rem;
    line-height: 1.3;
    text-align: center;
    margin: 0;
`;

export const StyledCategoryList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    padding: 0;
    flex-wrap: wrap;
`;

export const StyledCategoryTag = styled.li`
    display: inline-block;
    background-color: #e0f0ff;
    border-radius: 999px;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
`;
