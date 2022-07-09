import { useAuth0 } from "@auth0/auth0-react"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {LoginButton, LogoutButton} from "components/AuthButtons"
import Button from "components/Buttons"
import DarkMode from "features/DarkMode"
import React from "react"
import { useNavigate } from "react-router-dom"
import { FlexWrapper, HeaderWrapper, Heading } from "./styles"

interface Props {
    fixed?: boolean
    inCalendarsPage?: boolean
}

function Header({fixed, inCalendarsPage}: Props) {

    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    return (
        <HeaderWrapper fixed={fixed}>
            <Heading>dispo.</Heading>
            <FlexWrapper>
                <DarkMode />
                {isAuthenticated 
                ? <React.Fragment>
                    <LogoutButton />
                    {inCalendarsPage
                    ? <Button
                    onClick={() => navigate('/')}
                    ><FontAwesomeIcon icon={faStar} /> Create calendar </Button>
                    : <Button
                    onClick={() => navigate('/mycalendars')}
                    >My calendars</Button>}
                </React.Fragment>
                : <LoginButton />
                }
            </FlexWrapper>
        </HeaderWrapper>
    )
}

export default Header