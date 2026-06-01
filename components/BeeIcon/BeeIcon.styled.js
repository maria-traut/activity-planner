import styled from "styled-components";
export const StyledSVG = styled.svg`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke-linejoin: round;
    stroke-miterlimit: 2;

    transform: rotate(${(props) => props.rotation}deg);
    transform-origin: center;

    .WingsOpen {
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
    }

    .WingsClosed {
        opacity: 1;
        transition: opacity 0.15s ease-in-out;
    }

    &:hover {
        .WingsOpen {
            opacity: 1;
        }

        .WingsClosed {
            opacity: 0;
        }
    }
`;
