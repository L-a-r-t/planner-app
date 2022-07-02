import styled from "styled-components";

const Button = styled.button`
    border: none;
    background-color: var(--main-color);
    color: white;
    border-radius: 1rem;
    padding: 0.7rem 1.2rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

export const SubmitButton = styled.input`
    border: none;
    background-color: var(--main-color);
    color: white;
    border-radius: 1rem;
    padding: 0.7rem 1.2rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

export const BlankButton = styled.button`
    border: none;
    background-color: transparent;
    &:hover {
        cursor: pointer;
    }
`

export default Button