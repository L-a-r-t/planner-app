import { CenterWrapper, CardWrapper } from "components/Wrappers";
import React, { useState } from "react";
import { useAPI } from "utils/hooks";
import { useNavigate } from "react-router-dom";
import { Form, Heading, Label, TextInput } from "./styles";
import { SubmitButton } from "components/Buttons";
import Footer from "components/Footer";
import { useDispatch } from "react-redux";
import { showCorner } from "redux/reducers/modal"

function Home() {
    const [name, setName] = useState('');

    const [createCalendar] = useAPI();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCalendar({
            method: 'post',
            url: '/calendar/create',
            data: {
                name,
                description: '',
            }
        })
        .then((data) => {
            navigate(data.redirect)
        })
        .catch(err => {
            dispatch(showCorner({isError: true, message: "Oops! An error occured."}))
        })
    }

    return (
        <CenterWrapper 
            padding="0 1rem"
            isFullScreen 
        >
            <Heading>dispo.</Heading>
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
                    <SubmitButton type="submit" value="Create calendar" /> 
                </Form>
            </CardWrapper>
            <Footer anchorBottom>
                <span>An app made by <a href="https://www.linkedin.com/in/th%C3%A9o-lartigau-a07177222/" target="_blank" rel="noreferrer">Théo Lartigau</a> </span>
            </Footer>
        </CenterWrapper>
    )
}

export default Home;