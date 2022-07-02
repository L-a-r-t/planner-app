import { CardWrapper } from 'components/Wrappers'
import { useEffect, useState } from 'react'
import { Table, Th } from './Calendar.styles'
import { WeekRow, NewWeekRow } from './WeekRow'
import { getFirstDayOfWeek } from 'utils/logic'
import { Agenda } from 'utils/models'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

function Week() {
    const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const offset = useSelector((state: RootState) => state.offset.value)

    const [week, setWeek] = useState<Date[]>();

    const [shownAgendas, setShownAgendas] = useState<Agenda[]>()
    const agendas = useSelector((state: RootState) => state.agendas.array)

    useEffect(() => {
        const _monday = getFirstDayOfWeek(offset);
        const _week = getFullWeek(_monday);
        setWeek(_week);
        setAgendasFromProps(agendas);
    }, [agendas, offset]) // eslint-disable-line

    const getFullWeek = (monday:Date) => {
        const _week = [] as Date[];
        for (let i = 0; i < 7; i++) {
            _week.push(new Date(monday.valueOf() + i * MS_IN_A_DAY))
        }
        return _week;
    }
    
    const setAgendasFromProps = (agendas: Agenda[]) => {
        const formatted = agendas?.map((agenda) => {
            const datesArray = offset > 0 
            ? agenda.dates[offset * 7] === undefined
            ? [...Array(7).fill(null)] // blank if nonexistant
            : [...agenda.dates.slice(offset * 7, (offset + 1) * 7)] // with offset
            : [...agenda.dates.slice(0, 7)] // without offset
            return {
                owner: agenda.owner, 
                dates: datesArray,
            }});
        setShownAgendas(formatted);
    }

    return (
        <CardWrapper padding='0'>
            <Table>
                <thead>
                    <tr>
                        <Th />
                        {week?.map((day) => (
                            <Th key={day.toDateString()}>
                                {day.toDateString().slice(0, 4)}
                                <br/>
                                {day.toDateString().slice(4, 10)}
                            </Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {agendas?.map((agenda, index) =>                    
                    <WeekRow 
                        key={`${agenda.owner}-${index}`}
                        agenda={agenda}
                        index={index} 
                    />
                    )}
                    <NewWeekRow 
                        index={shownAgendas?.length ?? 0} 
                    />
                </tbody>
            </Table>
        </CardWrapper>
    )
}

export default Week