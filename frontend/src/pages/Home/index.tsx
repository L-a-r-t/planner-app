import { CenterWrapper, CardWrapper } from "components/Wrappers";
import React, { useState } from "react";
import { useAPI, useCornerModal } from "utils/hooks";
import { useNavigate } from "react-router-dom";
import { Form, Label, TextInput } from "./styles";
import { SubmitButton } from "components/Buttons";
import Footer from "components/Footer";
import Header from "components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "components/AuthButtons";

function Home() {
    const [name, setName] = useState('');

    const [createCalendar] = useAPI();
    const navigate = useNavigate();

    const {showCornerModal} = useCornerModal()

    const {isAuthenticated, user} = useAuth0();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCalendar({
            method: 'post',
            url: '/calendar/create',
            data: {
                name,
                description: '',
                userid: user?.sub
            }
        })
        .then((data) => {
            navigate(data.redirect)
        })
        .catch(err => {
            showCornerModal('Oops! An error occured.', true)
        })
    }

    return (
        <React.Fragment>
            <Header fixed/>
            <CenterWrapper 
                padding="0 1rem"
                isFullScreen 
            >
                <CardWrapper width="25rem">
                    <h2 style={{marginBlockStart: "0"}}>Create a new calendar</h2>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="name">Calendar name</Label>
                        <TextInput 
                            name="name" 
                            placeholder="ie: 'Summer vacations'"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            value={name}
                            required 
                        />
                        <p>
                            Once created, you can easily copy and share the link to anyone you want!
                        </p>
                        {!isAuthenticated && <LoginButton />}
                        {isAuthenticated && <SubmitButton type="submit" value="Create calendar" />}
                    </Form>
                </CardWrapper>
                <Footer anchorBottom>
                    <span>An app made by <a href="https://www.linkedin.com/in/th%C3%A9o-lartigau-a07177222/" target="_blank" rel="noreferrer">Théo Lartigau</a> </span>
                </Footer>
            </CenterWrapper>
        </React.Fragment>
    )
}

export default Home;