import { withAuthenticationRequired } from "@auth0/auth0-react"
import { CenterWrapper } from "components/Wrappers"
import Loader from "components/Loader"

interface Props {
    component: any
    args?: any
}

const Protected = ({component, ...args}:Props) => {
    const Comp = withAuthenticationRequired(component, {
        onRedirecting: () => <CenterWrapper isFullScreen><Loader /></CenterWrapper>
    })

    return (
    <Comp />
)}

export default Protected