import styled from "styled-components";

export const CalendarHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

export const HeadingWrapper = styled.button`
    border: none;
    background-color: transparent;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: var(--txt-color);
    }
`
