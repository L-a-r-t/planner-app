export interface StyledProps {
    padding?: string
    width?: string
    height?: string
}

export interface PageWrapperProps extends WrapperProps {
    isFullScreen?: boolean
    dontCenterVertically?: boolean
    dontCenterHorizontally?: boolean
}

export interface WrapperProps {
    overflow?: string
}