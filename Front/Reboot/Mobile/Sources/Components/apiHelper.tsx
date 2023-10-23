import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:8080';

// Function to get the stored bearer token
const getBearerToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('authorization');
};

// Generic GET function
export const apiGET = async (endpoint: string) => {
    const bearerToken = await getBearerToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: `${bearerToken}`,
        },
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    return await response.json();
};

// Generic POST function
export const apiPOST = async (endpoint: string, body: any) => {
    const bearerToken = await getBearerToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${bearerToken}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    return await response.json();
};
 