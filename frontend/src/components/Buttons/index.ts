import styled from "styled-components";

const Button = styled.button<ButtonProps>`
    border: none;
    background-color: ${props => props.transparent ? 'transparent' : "var(--main-color)"};
    color: white;
    border-radius: ${props => props.big ? "1.3rem" : "1rem"};
    padding: ${props => props.big ? "1rem 1.5rem" : "0.7rem 1.2rem"};
    font-size: ${props => props.big ? "1.3rem" : "1rem"};
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

export const RoundButton = styled.button<RoundButtonProps>`
    border: none;
    background-color: ${props => props.backgroundColor};
    color: white;
    border-radius: 1rem;
    height: 1.5rem;
    &:hover {
        cursor: pointer;
    }
`

export default Button

interface RoundButtonProps {
    backgroundColor: string
}

interface ButtonProps {
    big?: boolean
    transparent?: boolean
}