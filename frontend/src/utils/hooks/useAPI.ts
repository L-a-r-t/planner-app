import axios from 'axios';
import { useEffect, useState } from 'react';
import { hooks } from 'utils/models';

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
