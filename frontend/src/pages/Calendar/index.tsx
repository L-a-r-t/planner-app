import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthAPI } from "utils/hooks";
import { apis } from "utils/models";
import { CenterWrapper } from "components/Wrappers";
import Week from "features/Calendar/Week";
import CalendarNav from "features/Calendar/CalendarNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { set } from "redux/reducers/meta"
import { init } from "redux/reducers/agendas";
import { CalendarHeader, HeadingWrapper } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Buttons";
import Footer from "components/Footer";
import Loader from "components/Loader";
import { showCorner } from "redux/reducers/modal";
import Tutorial from "features/Tutorial";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "components/Header";

function Calendar() {
    const params = useParams();
    const navigate = useNavigate();
    const { isLoading, user } = useAuth0();

    const [getCalendar, loading, error, data] = useAuthAPI<apis.CalendarData>();
    const [errorMessage, setErrorMessage] = useState<ReactElement<any, any>>();

    const metadata = useSelector((state: RootState) => state.metadata)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!data) return
        const {name, description, agendas} = data;
        dispatch(set({name, description}));
        dispatch(init({agendas}));
        document.title = name;
    }, [data]) // eslint-disable-line

    useEffect(() => {
        if (isLoading) return
        getCalendar({
            method: user ? 'post' : 'get',
            url: `calendar/${params.id}`,
            data: user ? {
                email: user?.email
            } : undefined
        })
    }, [isLoading]) // eslint-disable-line

    useEffect(() => {
        if (!error) return
        if (error.message.includes('404')) {
            setErrorMessage(
            <div>
                <h1>This agenda doesn't exist</h1>
                <p>If it hasn't been viewed for 7 days in a row, it has been automatically deleted. If that's not the case, make sure the link is correct.</p>
            </div>)
        } else if (error.message.includes('401')) {
            setErrorMessage(
            <div>
                <h1>You don't have access to this agenda</h1>
                <p>You should ask access to the owner of the agenda.</p>
            </div>)
        } else {
            setErrorMessage(
            <div>
                <h1>Oops, an error occured!</h1>
                <p>That's on our side. We'll investigate the issue ASAP, sorry for the inconvenience!</p>
            </div>)
        }
    }, [error])

    return (
    <React.Fragment>
        <Header />
    <CenterWrapper 
        padding="1rem" 
        isFullScreen
        dontCenterVertically>
        {
            loading
            ? <CenterWrapper isFullScreen>
                <Loader />
            </CenterWrapper>
            : error
            ? <React.Fragment>
                {errorMessage}
                <Button
                    onClick={() => navigate('/')}
                > <FontAwesomeIcon icon={faStar} /> Create a new calendar 
                </Button>
              </React.Fragment>
            : (
                <div>
                    <Tutorial />
                    <CalendarHeader>                        
                        <HeadingWrapper
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.toString())
                                dispatch(showCorner({isError: false, message: "Link copied to clipboard!"}))
                            }}
                        >
                            <h1>{metadata?.name} <FontAwesomeIcon icon={faLink} /></h1>
                        </HeadingWrapper>
                        <CalendarNav />
                    </CalendarHeader>
                    <Week />
                    <Footer>
                        <span>An app made by <a className="underline" href="https://www.linkedin.com/in/th%C3%A9o-lartigau-a07177222/" target="_blank" rel="noreferrer">Théo Lartigau</a> </span>
                        <Button
                            onClick={() => navigate('/')}
                            style={{marginLeft: "0.5rem"}}
                        > <FontAwesomeIcon icon={faStar} /> Create a new calendar 
                        </Button>
                    </Footer>
                </div>
            )
        }
    </CenterWrapper>
    </React.Fragment>
)}

export default Calendar;