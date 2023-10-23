import { useCookies } from 'react-cookie';

export const useBearerFetch = () => {
    const [cookies] = useCookies(['authorization']);

    const bearerFetch = (url: string, options: RequestInit = {}) => {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            Authorization: `${cookies.authorization}`,
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
