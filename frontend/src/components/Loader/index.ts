import styled from "styled-components";
import { keyframes } from "styled-components";

const loadAnimation = keyframes`
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
`

const Loader = styled.div`
    width: 10rem;
    height: 10rem;
    border: 1.5rem solid var(--main-color);
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: ${loadAnimation} 2s linear infinite;
`

export default Loader
