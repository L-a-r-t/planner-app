import styled from 'styled-components'
import { StyledProps, PageWrapperProps, WrapperProps } from 'utils/models/styles'

export const CenterWrapper = styled.div<StyledProps & PageWrapperProps>`
    display: flex;
    justify-content: ${props => props.dontCenterVertically ? "normal" : "center"};
    align-items: ${props => props.dontCenterHorizontally ? "normal" : "center"};
    flex-direction: column;
    padding: ${props => props.padding || "2rem"};
    min-height: ${props => props.isFullScreen ? "100vh" : "0px"};
    background-color: var(--bg-color);
    color: var(--txt-color);
`

export const CardWrapper = styled.div<StyledProps & WrapperProps>`
    border-radius: 2rem;
    border: 2px solid grey;
    padding: ${props => props.padding || "2rem"};
    width: ${props => `min(${props.width}, 90%)` || "fit-content"};
    height: ${props => props.height || "fit-content"};
    overflow: ${props => props.overflow ?? "hidden"};
`