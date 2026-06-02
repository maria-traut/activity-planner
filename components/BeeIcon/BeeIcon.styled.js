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
        .wingsOpen {
            animation: ${flap} 0.2s linear infinite;
        }

        .wingsClosed {
            animation: ${flap} 0.2s linear infinite reverse;
        }
    }
`;
