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
    height: 3rem;
    &:first-child {
        border-left: none;
    }
    &:last-child {
        border-right: none;
    }
`

export const CheckBox = styled.input`
    height: 2rem;
    width: 2rem;
`

export const Tr = styled.tr`
    &:hover {
        cursor: pointer;
        background-color: var(--highlight);
    }
`