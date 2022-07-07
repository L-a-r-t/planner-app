import styled from "styled-components"

interface Props {
    available: boolean | null
    onClick?: () => void
}

export const Card = styled.div<Props>`
    width: 100%;
    height: 3rem;
    color: white;
    font-weight: bold;
    background-color: 
        ${props => 
            props.available == null 
            ? "var(--gray)"
            : props.available
            ? "var(--green)"
            : "var(--red)"
        };
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    &:hover {
        cursor: pointer;
    }
`

export const Wrapper = styled.div<Props>`
    width: 100%;
    height: 5rem;
    background-color: 
        ${props => 
            props.available == null 
            ? "var(--light-gray)"
            : props.available
            ? "var(--light-green)"
            : "var(--light-red)"
        };
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

`