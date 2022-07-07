import { useAuth0 } from "@auth0/auth0-react"
import {LoginButton, LogoutButton} from "components/AuthButtons"
import Button, { BlankButton } from "components/Buttons"
import DarkMode from "features/DarkMode"
import React from "react"
import { FlexWrapper, HeaderWrapper, Heading } from "./styles"

interface Props {
    fixed?: boolean
}

function Header({fixed}: Props) {

    const { isAuthenticated } = useAuth0()

    return (
        <HeaderWrapper fixed={fixed}>
            <Heading>dispo.</Heading>
            <FlexWrapper>
                <DarkMode />
                {isAuthenticated 
                ? <React.Fragment>
                    <LogoutButton />
                    <Button>My calendars</Button>
                </React.Fragment>
                : <LoginButton />
                }
            </FlexWrapper>
        </HeaderWrapper>
    )
}

export default Header