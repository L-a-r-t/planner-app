import styled from "styled-components";

const handleBottom = (onBottom: (boolean | undefined)) => {
    if (!onBottom) return
    return "position: absolute; bottom: 0.5rem;"
}

const Footer = styled.footer<FooterProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    ${props => handleBottom(props.anchorBottom)}
`

interface FooterProps {
    anchorBottom?: boolean
}

export default Footer