import { useDispatch } from 'react-redux';
import { showCorner, hideCorner } from 'redux/reducers/modal'

export const useCornerModal = () => {
    const dispatch = useDispatch()

    const showCornerModal = (message: string, isError?: boolean) => {dispatch(showCorner({message, isError: isError ?? false}))}
    const hideCornerModal = () => {dispatch(hideCorner())}

    return {showCornerModal, hideCornerModal}
}