import { useAuth0 } from "@auth0/auth0-react"
import Button from "components/Buttons"

export function LogoutButton() {
    const { logout } = useAuth0()
    
    return (
        <Button
            onClick={() => logout({returnTo: window.location.origin})}
            transparent
            style={{color: 'var(--txt-color)'}}
        >Log Out
        </Button>
    )
}