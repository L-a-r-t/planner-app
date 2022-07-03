import Button from "components/Buttons";
import React from "react";
import { useTutorial } from "utils/hooks"
import { Wrapper, Image, P } from "./styles"

function Tutorial() {
    const [showTutorial, step, nextStep] = useTutorial(3);

    return (
        <React.Fragment>
            {showTutorial ?
            <Wrapper>
                {step === 0 ? 
                <React.Fragment>
                    <Image src="/tuto-1-darkmode.png" alt="screenshot of the button used to add a new row to the calendar, which is a plus sign." /> 
                    <P>Click the + button to add a new row (= a new person's availabilities) to the calendar.</P>
                </React.Fragment>
                : step === 1 ? 
                <React.Fragment>
                    <Image src="/tuto-2-darkmode.png" alt="screenshot of the button used to save any changes, that is a green checkmark, next to the button used to discard changes/delete a row, which is a red cross/trashbin respectively" /> 
                    <P>Click the green checkmark to save any changes. They won't be saved to our servers otherwhise!<br/>You can also click the trash bin to delete the selected row.</P>
                </React.Fragment> : 
                <React.Fragment>
                    <Image src="/tuto-3-darkmode.png" alt="screenshot of the navigation buttons, '<' and '>'"/>
                    <P>Use the navigation buttons on the top right of the agenda to see other weeks.</P>
                </React.Fragment>}
                <Button onClick={nextStep} big>
                    {step === 2 ? 'Got it!' : 'Next'}
                </Button>
            </Wrapper>
            : null}
        </React.Fragment>
    )
}

export default Tutorial