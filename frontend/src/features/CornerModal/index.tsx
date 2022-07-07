import { useSelector } from "react-redux"
import { RootState } from "redux/store"
import ReactDOM from "react-dom"
import { Wrapper, CloseButton } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useCornerModal } from "utils/hooks"

function CornerModal() {
    const sharedState = useSelector((state: RootState) => state.modal.corner)
    const {hideCornerModal} = useCornerModal()

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!sharedState.isShowing) {
            setFadeOut(false)
            return
        }
        setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => {
                hideCornerModal()
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
                onClick={() => hideCornerModal()}
            > <FontAwesomeIcon icon={faXmark} />
            </CloseButton>
        </Wrapper>, document.body
    ) : null
}

export default CornerModal