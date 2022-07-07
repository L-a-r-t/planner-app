import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;
    color: #222;
`

export const Image = styled.img`
    width: max(50vh, 300px);
    height: max(50vh, 300px);
    border-radius: 10% 40% 20% 40%;
`

export const P = styled.p`
    text-align: center;
    min-height: 3rem;
    margin: 2rem 0;
    width: max(40vw, 300px);
`