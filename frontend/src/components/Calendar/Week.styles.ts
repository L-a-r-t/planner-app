import styled from "styled-components";
import { device } from "utils/styles/sizes";

export const Table = styled.table`
    padding: 3rem;
    border-collapse: collapse;
    text-align: center;
`

export const Th = styled.th`
    border-top: 1px solid #AAA;
    border-top: none;
    padding: 1rem;
    border-collapse: collapse;
    
    @media ${device.desktopL} {
        width: 9rem;
    }
    @media ${device.desktop} {
        width: 8rem;
    }
    @media ${device.laptopL} {
        width: 7rem;
    }
    @media ${device.laptop} {
        width: 6rem;
    }
    @media ${device.tablet} {
        padding: 1rem 0.5rem;
        width: 5rem;
    }
    @media ${device.mobileL} {
        padding: 1rem 0.2rem;
        font-size: 0.785rem;
    }
    @media ${device.mobileM} {
        padding: 1rem 0.1rem;
        font-size: 0.7rem;
    }

    &:first-child {
        border-left: none;
    }
    &:last-child {
        border-right: none;
    }
`

export const Td = styled.td`
    border-top: 1px solid #AAA;
    padding: 0;
    border-collapse: collapse;
    &:first-child {
        border-left: none;
    }
    &:last-child {
        border-right: none;
    }
`

export const Owner = styled.p`
    width: 6rem;
    height: 3rem;
    margin: 0.5rem;
    font-size: inherit;
    @media ${device.mobileL} {
        width: fit-content;
        font-size: 0.785rem;
    }
    @media ${device.tablet} {
        width: fit-content;
    }
`

export const NewRowTd = styled.td`
    border: none;
    padding: 0.5rem;
    border-collapse: collapse;
`

export const NewRowInput = styled.input`
    width: 5rem;
    height: 2rem;
    margin: 0.5rem;
    background-color: transparent;
    border: none;
    color: var(--txt-color);

    @media ${device.mobileL} {
        max-width: 2rem;
        font-size: 0.785rem;
    }
    @media ${device.tablet} {
        max-width: 3rem;
    }

    &:focus-visible {
        color: var(--txt-color);
        outline: none;
        border-bottom: 2px solid var(--txt-color);
    }
`

export const NewRowTr = styled.tr<NewRowTrProps>`
    background-color: 
        ${props => props.highlighted
        ? "var(--highlight)"
        : "transparent"};
    &:hover {
        cursor:
            ${props => props.highlighted
            ? "default"
            : "pointer"};
        background-color: var(--highlight);
    }
`

interface NewRowTrProps {
    highlighted: boolean
}