import { Td, NewRowInput, NewRowTd, Owner, NewRowTr } from "./Calendar.styles"
import { WeekRowProps } from "utils/models/props"
import DayCard from "./DayCard"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { add, highlight, update, push, pushhighlight, resethighlight, erase } from 'redux/reducers/agendas'
import { showCorner } from "redux/reducers/modal";
import { useAPI } from "utils/hooks";
import { BlankButton, RoundButton } from "components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

export function WeekRow({agenda, index}: WeekRowProps) {
    const input = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');

    const offset = useSelector((state: RootState) => state.offset.value)
    const highlighted = useSelector((state: RootState) => state.agendas.highlighted)

    const [updateAgenda] = useAPI()
    const [deleteAgenda] = useAPI()
    
    const dispatch = useDispatch()

    const handleSubmit = (e:React.PointerEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        updateAgenda({
            method: 'post',
            url: `/calendar/${window.location.pathname.split('/')[2]}/update`,
            data: {
                agenda: {dates: highlighted?.agenda.dates, owner: inputValue},
                index: highlighted?.row,
            }
        }).then(() => {
            dispatch(update({owner: inputValue}))
            dispatch(showCorner({isError: false, message: "Successfully updated!"}))
        }).catch(err => {
            dispatch(showCorner({isError: true, message: "Oops! An error occured."}))
        })
    }

    const handleDelete = (e:React.PointerEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        deleteAgenda({
            method: 'post',
            url: `/calendar/${window.location.pathname.split('/')[2]}/delete/${highlighted?.row}`
        }).then(() => {
            dispatch(erase())
            dispatch(showCorner({isError: false, message: "Successfully deleted!"}))
        }).catch(err => {
            dispatch(showCorner({isError: true, message: "Oops! An error occured."}))
        })
    }
    
    useEffect(() => {
        if (highlighted?.row === index) {
            input.current?.focus();
            setInputValue(highlighted.agenda.owner ?? '');
        }
    }, [highlighted?.row, index]) // eslint-disable-line

    useEffect(() => {
        if (highlighted?.row === index && highlighted?.agenda.dates[offset * 7] === undefined) dispatch(pushhighlight())
        else if (agenda?.dates[offset * 7] === undefined) dispatch(push({row: index}))
    }, [offset]) // eslint-disable-line

    return (
        <tr 
            style={{backgroundColor: index === highlighted?.row ? 'var(--highlight)' : 'transparent'}}
            onClick={() => {
                if (!agenda) return
                dispatch(highlight({agenda, row: index}))
            }}
        >
            {index === highlighted?.row
    // WHEN HIGHLIGHTED
            ? <>         
            <Td>
                <NewRowInput 
                    ref={input}
                    placeholder={highlighted?.agenda.owner}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <br/>
                <div
                    style={{display: "flex", justifyContent: "space-around"}}
                >
                    <RoundButton
                        onClick={handleSubmit}
                        aria-label="Save"
                        backgroundColor="var(--green2)"
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </RoundButton>
                    <RoundButton
                        onClick={handleDelete}
                        aria-label="Delete"
                        backgroundColor="var(--red2)"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </RoundButton>
                </div>
            </Td>
            {highlighted?.agenda.dates
                .slice(offset * 7, (offset + 1) * 7)
                .map((val, idx) =>
                <Td key={"rowdc" + idx}>
                    <DayCard available={val} row={index} day={offset * 7 + idx}/>  
                </Td>
            )}
            </>
    // WHEN NOT HIGHLIGHTED
            : <>
            <Td style={{display: "flex", justifyContent: "center", alignItems: "center", height: "calc(5rem + 1px)"}}>
                <Owner>
                    {agenda?.owner}
                </Owner>
            </Td>
            {agenda?.dates
                .slice(offset * 7, (offset + 1) * 7)
                .map((val, idx) => (
                <Td key={"rowdc" + index.toString() + idx}>
                    <DayCard available={val} row={index} day={offset * 7 + idx}/>  
                </Td>
            ))}
            </>
            }
        </tr>
    )

}

/** I am well aware that this doesn't look a lot like DRY 
 * but I found that this component's logic has enough differences
 * with the basic WeekRow component for it to be worth it */
export function NewWeekRow({index}: WeekRowProps) {
    const input = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');

    const offset = useSelector((state: RootState) => state.offset.value)
    const highlighted = useSelector((state: RootState) => state.agendas.highlighted)

    const [addAgenda] = useAPI()

    const dispatch = useDispatch()

    const handleSubmit = (e:React.PointerEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addAgenda({
            method: 'post',
            url: `/calendar/${window.location.pathname.split('/')[2]}/add`,
            data: {
                agenda: {dates: highlighted?.agenda.dates, owner: inputValue},
            }
        }).then(() => {
            dispatch(add({owner: inputValue}));
            setInputValue('');
            dispatch(showCorner({isError: false, message: "Successfully added!"}))
        }).catch(err => {
            dispatch(showCorner({isError: true, message: "Oops! An error occured."}))
        })
    }
    
    useEffect(() => {
        if (highlighted?.row === index) input.current?.focus();
    }, [highlighted?.row, index])

    useEffect(() => {
        if (highlighted?.row === index && highlighted?.agenda.dates[offset * 7] === undefined) dispatch(pushhighlight())
    }, [offset]) // eslint-disable-line

    return (
        <NewRowTr 
            highlighted={index === highlighted?.row}
            onClick={() => {
                dispatch(highlight({
                    row: index,
                    agenda: {
                        owner: '',
                        dates: Array((offset + 1) * 7).fill(null)
                    }
                }))
            }}
        >
            {index === highlighted?.row
    // WHEN FOCUSED
            ? <>         
            <NewRowTd>
                <NewRowInput 
                    ref={input}
                    placeholder='Someone'
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
                <br/>
                <div
                    style={{display: "flex", justifyContent: "space-around"}}
                >
                    <BlankButton
                        onClick={handleSubmit}
                        aria-label="Save"
                        style={{color: "#5F5", opacity: "0.7"}}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </BlankButton>
                    <BlankButton
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(resethighlight())}}
                        aria-label="Delete"
                        style={{color: "red", opacity: "0.7"}}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </BlankButton>
                </div>
            </NewRowTd>
            {highlighted.agenda.dates
            .slice(offset * 7, (offset + 1) * 7)
            .map((val, idx) =>
                <Td key={"newrowdc" + idx}>
                    <DayCard available={val} row={index} day={offset * 7 + idx} />  
                </Td>
            )}
            </>
    // WHEN NOT FOCUSED
            : <>
            <td>
                <p>
                    Add person
                </p>
            </td>
            {Array.apply(null, Array(7)).map((val, index) => (
                <td key={"newrow" + index} />
            ))}
            </>
            }
        </NewRowTr>
    )
}