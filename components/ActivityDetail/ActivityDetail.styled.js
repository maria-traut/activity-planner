import styled from "styled-components";
import Image from "next/image";

export const StyledActivityInfoContainer = styled.section`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
`;

export const StyledImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const StyledLocations = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 0.5rem;
  position: absolute;
  display: flex;
  gap: 0.5rem;
  top: 0.5rem;

  z-index: 2;

  li {
    text-align: center;
    background-color: #e0f0ff;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 0.8rem;
  }
`;

export const StyledCategories = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  gap: 0.5rem;

  margin-top: 2rem;

  li {
    text-align: center;

    background-color: #e0f0ff;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 0.8rem;
  }
`;

export const StyledImage = styled(Image)`
  border-radius: 20px;
`;
