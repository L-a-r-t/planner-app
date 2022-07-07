import { useDispatch, useSelector } from "react-redux"
import { RootState } from "redux/store"
import { increment, decrement, reset } from "redux/reducers/offset"
import styled from "styled-components"

const Wrapper = styled.div`
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: end;
`

const NavButton = styled.button`
    border: none;
    background: transparent;
    color: var(--txt-color);
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    &:hover {
        cursor: pointer;
        background-color: var(--highlight);
    }
`

const ResetButton = styled(NavButton)`
    text-align: center;
    border: none;
`

function CalendarNav() {
    const offset = useSelector((state: RootState) => state.offset.value)
    const dispatch = useDispatch()
    
    return (
        <Wrapper>
            {offset > 0 && 
            <NavButton
                onClick={() => dispatch(decrement())}
            > {'<'}
            </NavButton>
            }
            <ResetButton
                onClick={() => dispatch(reset())}
            >Today
            </ResetButton>
            <NavButton
                onClick={() => dispatch(increment())}
            > {'>'}
            </NavButton>
        </Wrapper>
    )
}

export default CalendarNav