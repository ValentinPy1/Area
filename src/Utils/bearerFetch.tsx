import { useCookies } from 'react-cookie';

export const useBearerFetch = () => {
    const [cookies] = useCookies(['bearer']);

    const bearerFetch = (url: string, options: RequestInit = {}) => {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.bearer}`,
        };

        return fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...(options.headers || {}),
            },
        });
    };

    return bearerFetch;
};
