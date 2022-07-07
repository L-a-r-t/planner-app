import { useEffect, useState } from 'react';
import { hooks } from 'utils/models';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showCorner, hideCorner } from 'redux/reducers/modal'

export const useAPIOnLoad = <T>({method, url, data}: hooks.UseAPIParams) : hooks.UseAPIOnLoadReturns<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [resData, setData] = useState<T>();
    
    useEffect(() => {
        setLoading(true);
        axios({
            method,
            url,
            data
        })
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            setError(err);
        })  
        .finally(() => {
            setLoading(false);
        })  
    }, []) // eslint-disable-line

    return [loading, error, resData];
}

export const useAPI = <T>() : hooks.UseAPIReturns<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [resData, setData] = useState<T>();

    const invoke = async ({method, url, data}: hooks.UseAPIParams) => {
        try {
            setLoading(true);
            const res = await axios({
                method,
                url,
                data
            })
            setData(res.data);
            return res.data
        }
        catch (err) {
            if (err instanceof Error) setError(err)
        }
        finally {
            setLoading(false);
        }
    }

    return [invoke, loading, error, resData];
}

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

export const useCornerModal = () => {
    const dispatch = useDispatch()

    const showCornerModal = (message: string, isError?: boolean) => {dispatch(showCorner({message, isError: isError ?? false}))}
    const hideCornerModal = () => {dispatch(hideCorner())}

    return {showCornerModal, hideCornerModal}
}