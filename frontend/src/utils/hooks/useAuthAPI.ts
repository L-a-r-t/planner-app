import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useState } from 'react';
import { hooks } from 'utils/models';

export const useAuthAPI = <T>() : hooks.UseAPIReturns<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [resData, setData] = useState<T>();

    const { getAccessTokenSilently } = useAuth0();

    const invoke = async ({method, url, data}: hooks.UseAPIParams) => {
        try {
            setLoading(true);
            const token = await getAccessTokenSilently();
            const res = await axios({
                method,
                url,
                data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
