import styled, { keyframes } from "styled-components";

const flap = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
  `;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

export const StyledSVG = styled.svg`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke-linejoin: round;
    stroke-miterlimit: 2;

    transform: rotate(${(props) => props.rotation}deg);
    transform-origin: center;

    .wingsOpen {
        opacity: 0;
    }

    .wingsClosed {
        opacity: 1;
    }

    &.isAnimating {
        animation: ${shake} 0.15s linear infinite;
        .wingsOpen {
            animation: ${flap} 0.3s linear infinite;
        }

        .wingsClosed {
            animation: ${flap} 0.3s linear infinite reverse;
        }
    }
`;
