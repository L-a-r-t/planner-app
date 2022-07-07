import { useEffect, useState } from "react"
import { DarkmodeButton } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function DarkMode() {
    const [isDarkmode, setDarkmode] = useState(false);

    const toggleDarkmode = () => {
        const darkmode = !isDarkmode;
        localStorage.setItem('darkmode', String(darkmode))
        window.location.reload();
    }

    useEffect(() => {
        const darkmodeCookie = localStorage.getItem('darkmode')
        if (darkmodeCookie) setDarkmode(darkmodeCookie === 'true');
    }, [])

    return (
        <DarkmodeButton onClick={toggleDarkmode}>
            <FontAwesomeIcon icon={isDarkmode
            ? faSun
            : faMoon} /> 
        </DarkmodeButton>
    )
}

export default DarkMode