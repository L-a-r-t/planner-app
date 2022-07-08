import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthAPI, useCornerModal } from "utils/hooks"

function LoggedIn() {
    const navigate = useNavigate()
    const {isLoading, isAuthenticated, user} = useAuth0()
    const [callAPI] = useAuthAPI()
    const {showCornerModal} = useCornerModal()

    useEffect(() => {
        if (isLoading) return
        if (!isAuthenticated) {            
            navigate('/')
            return
        }
        callAPI({
            method: 'post',
            url: '/user/login',
            data: {
                verified: user?.email_verified
            }
        })
        .catch(err => { 
            showCornerModal('Oops, an error occured!', true)
        })
        .finally(() => {
            navigate('/')
        })
    }, [isLoading]) // eslint-disable-line

    return null
}

export default LoggedIn