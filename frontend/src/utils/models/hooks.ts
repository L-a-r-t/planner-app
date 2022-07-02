export interface UseAPIParams {
    method: string
    url: string
    data?: object
}

export type UseAPIReturns = [({method, url, data}: UseAPIParams) => Promise<any>, boolean]
export type UseAPIOnLoadReturns<T> = [boolean, Error | undefined, T?]