import styled from "styled-components";

export const Wrapper = styled.div<WrapperProps>`
    position: fixed;
    width: max(25%, 250px);
    padding: 0.5rem 0.7rem;
    border-radius: 0.75rem;
    bottom: 1rem;
    right: 1rem;
    color: white;
    background-color: 
        ${props => props.fadeOut
        ? "transparent"
        : props.isError
        ? "var(--red)"
        : "var(--green)"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 1s ease-in;
    opacity: 
        ${props => props.fadeOut
        ? "0"
        : "1"};
`

export const CloseButton = styled.button`
    border: none;
    background-color: transparent;
    color: white;
    font-size: 1.4rem;
    &:hover {
        cursor: pointer;
    }
`

interface WrapperProps {
    isError: boolean
    fadeOut: boolean
}