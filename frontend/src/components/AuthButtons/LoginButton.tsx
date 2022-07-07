import { useAuth0 } from "@auth0/auth0-react"
import Button from "components/Buttons"

export function LoginButton() {
    const { loginWithRedirect } = useAuth0()
    
    return (
        <Button 
            onClick={() => loginWithRedirect({redirectUri: window.location.origin + '/loggedin'})}
        >Log In
        </Button>
    )
}