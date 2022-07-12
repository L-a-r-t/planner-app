import { useAuth0 } from "@auth0/auth0-react"
import Header from "components/Header"
import Loader from "components/Loader"
import { CardWrapper, CenterWrapper } from "components/Wrappers"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthAPI, useCornerModal } from "utils/hooks"
import { apis } from "utils/models"
import { Td, Th, Table, CheckBox, Tr } from "./styles"

function MyCalendars() {
    const { isLoading, user } = useAuth0()

    const [getCalendars, loading, error, calendars] = useAuthAPI<apis.CalendarList>()
    const {showCornerModal} = useCornerModal()

    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            showCornerModal('Oops, an error occured!', true)
        }
    }, [error, showCornerModal])

    useEffect(() => {
        if (isLoading) return
        getCalendars({
            method: 'post',
            url: '/user/calendars',
            data: {
                email: user?.email
            }
        })
    }, [isLoading]) // eslint-disable-line

    return (
        <React.Fragment>
            <Header inCalendarsPage />
            <CenterWrapper
                padding="1rem" 
                isFullScreen
                dontCenterVertically                
            >
                <div>
                    <h1>My Calendars</h1>
                </div>
                <CardWrapper padding="0">
                    <Table>
                        <thead>
                            <tr>
                                <Th>Name</Th>
                                <Th>Status</Th>
                                <Th>Public</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {(isLoading || loading) && 
                            <tr>
                                <td colSpan={3}><Loader /></td>
                            </tr>}
                            {(calendars) ?
                            calendars.length > 0 
                            ? calendars.map((calendar, calendarIdx) => 
                            <Tr 
                                key={`${calendar.name}${calendar.owner}${calendar.public}${calendarIdx}`}
                                onClick={() => navigate(`/calendar/${calendar.id}`)}
                            >
                                <Td>{calendar.name}</Td>
                                <Td>{calendar.owner ? 'owner' : 'invited'}</Td>
                                <Td><CheckBox type="checkbox" name="isPublic" checked={calendar.public} readOnly /></Td>
                            </Tr>)
                            : <tr>
                                <td colSpan={3}>You don't have any calendars yet.</td>
                              </tr>
                            : null}
                        </tbody>
                    </Table>
                </CardWrapper>
            </CenterWrapper>
        </React.Fragment>
    )
}

export default MyCalendars