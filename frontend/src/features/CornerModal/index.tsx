import { useDispatch, useSelector } from "react-redux"
import { RootState } from "redux/store"
import { hideCorner } from "redux/reducers/modal"
import ReactDOM from "react-dom"
import { Wrapper, CloseButton } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

function CornerModal() {
    const sharedState = useSelector((state: RootState) => state.modal.corner)
    const dispatch = useDispatch()

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!sharedState.isShowing) {
            setFadeOut(false)
            return
        }
        setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => {
                dispatch(hideCorner())
            }, 1000)
        }, 2000)
    }, [sharedState.isShowing]) // eslint-disable-line

    return sharedState.isShowing ? ReactDOM.createPortal(
        <Wrapper 
            isError={sharedState.isError} 
            fadeOut={fadeOut}
        >
            {sharedState.message}
            <CloseButton
                onClick={() => dispatch(hideCorner())}
            > <FontAwesomeIcon icon={faXmark} />
            </CloseButton>
        </Wrapper>, document.body
    ) : null
}

export default CornerModal