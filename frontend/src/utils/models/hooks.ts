export interface UseAPIParams {
    method: string
    url: string
    data?: object
}

export type UseAPIReturns<T> = [({method, url, data}: UseAPIParams) => Promise<any>, boolean, Error?, T?]
export type UseAPIOnLoadReturns<T> = [boolean, Error?, T?]
export type UseTutorialReturns = [boolean, number, () => void]