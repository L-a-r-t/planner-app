import { useAuth0 } from "@auth0/auth0-react"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {LoginButton, LogoutButton} from "components/AuthButtons"
import Button from "components/Buttons"
import DarkMode from "features/DarkMode"
import React from "react"
import { FlexWrapper, HeaderWrapper, Heading } from "./styles"
import { Link } from "react-router-dom"

interface Props {
    fixed?: boolean
    inCalendarsPage?: boolean
}

function Header({fixed, inCalendarsPage}: Props) {

    const { isAuthenticated } = useAuth0()    

    return (
        <HeaderWrapper fixed={fixed}>
            <Heading><Link to="/">dispo.</Link></Heading>
            <FlexWrapper>
                <DarkMode />
                {isAuthenticated 
                ? <React.Fragment>
                    <LogoutButton />
                    {inCalendarsPage
                    ? <Button>
                        <Link to="/"><FontAwesomeIcon icon={faStar} /> Create calendar </Link>
                      </Button>
                    : <Button>
                        <Link to="/mycalendars">My calendars</Link>
                      </Button>}
                </React.Fragment>
                : <LoginButton />
                }
            </FlexWrapper>
        </HeaderWrapper>
    )
}

export default Header