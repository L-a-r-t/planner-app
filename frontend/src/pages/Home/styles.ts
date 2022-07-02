import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const TextInput = styled.input`
    margin-top: 0.5rem;
    height: 2rem;
`

export const Label = styled.label`
    margin-top: 0.5rem;
    &:first-child {
        margin-top: auto;
    }
`

export const Heading = styled.h1`
    position: absolute;
    top: 0;
`