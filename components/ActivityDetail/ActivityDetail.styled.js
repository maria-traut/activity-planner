import styled from "styled-components";
import Image from "next/image";

export const StyledActivityInfoContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`;

export const StyledImageContainer = styled.div`
    position: relative;
`;

export const StyledImageLayerTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    z-index: 2;
`;

export const StyledImageLayerBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem;
    z-index: 1;
`;

export const StyledActivityDetailTitle = styled.h2`
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.5);
    display: table;
    padding: 0.5rem 1rem;
    border-radius: 999px;
`;

export const StyledLocations = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.8rem;

    li {
        text-align: center;
        background-color: #e0f0ff;
        border-radius: 999px;
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
    }
`;

export const StyledCategories = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    gap: 0.8rem;

    li {
        text-align: center;
        background-color: #e0f0ff;
        border-radius: 999px;
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
    }
`;

export const StyledImage = styled(Image)`
    border-radius: 0px;
    max-width: 100%;
    width: 100%;
    height: auto;
`;

export const StyledActivityDetailDescriptionWrap = styled.div`
    padding: 0 1rem;

    article {
        max-width: 80ch;
    }
`;
