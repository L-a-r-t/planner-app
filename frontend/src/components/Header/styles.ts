import styled from "styled-components";

interface Props {
    fixed?: boolean
}

export const HeaderWrapper = styled.header<Props>`
    position: ${props => props.fixed ? 'fixed' : 'relative'};
    top: 0;
    padding: 1rem 2rem;
    width: 100%;
    background-color: var(--bg-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Heading = styled.h1`
    margin: 0;
`

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`