import { useDispatch } from "react-redux";
import { DayCardProps } from "utils/models/props";
import { Card, Wrapper } from "./DayCard.styles";
import { updatehighlighted } from 'redux/reducers/agendas'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faQuestion } from "@fortawesome/free-solid-svg-icons";

function DayCard({ available, row, day }:DayCardProps) {
    const dispatch = useDispatch()

    const handleClick = () => {
        const newState = available === null 
        ? true
        : available
        ? false
        : null
        dispatch(updatehighlighted({
            available: newState,
            row,
            day
        }))
    }

    return (
        <Wrapper available={available}>
            <Card available={available} onClick={handleClick}>
            {   available == null 
                ? <FontAwesomeIcon icon={faQuestion} />
                : available
                ? <FontAwesomeIcon icon={faCheck} />
                : <FontAwesomeIcon icon={faXmark} />
            }
            </Card>
        </Wrapper>
    )
}

export default DayCard;