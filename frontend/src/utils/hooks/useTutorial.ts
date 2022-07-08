import { useEffect, useState } from 'react';
import { hooks } from 'utils/models';

export const useTutorial = (tutorialSteps: number): hooks.UseTutorialReturns => {
    const [isFirstVisit, setFirstVisit] = useState(false)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const firstTime = localStorage.getItem('visited') === null;
        setFirstVisit(firstTime)
    }, [])
    
    useEffect(() => {
        if (step < tutorialSteps) return
        localStorage.setItem('visited', 'y')
        setFirstVisit(false)
    }, [step, tutorialSteps])

    const next = () => {
        setStep(currentStep => currentStep + 1)
    }

    return [isFirstVisit, step, next]
}