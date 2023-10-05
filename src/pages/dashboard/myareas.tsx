import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';

type Area = {
    id: string;
    userId: string;
    triggerId: string;
    triggerData: string;
    actionId: string;
    actionData: string;
};

export default function MyAreas() {
    const [areas, setAreas] = useState<Area[]>([]);
    const bearerFetch = useBearerFetch();

    useEffect(() => {
        fetchAreas();
    }, [bearerFetch]);

    const fetchAreas = () => {
        const apiUrl = 'http://localhost:8080/task/mytasks';

        bearerFetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setAreas(data);
            })
            .catch(error => {
                console.error("Error fetching areas:", error);
            });
    };

    const deleteArea = (id: string) => {
        const apiUrl = `http://localhost:8080/task/delete/${id}`;

        bearerFetch(apiUrl, { method: 'DELETE' })
            .then(() => {
                fetchAreas();  // Refresh the areas list after a successful delete
            })
            .catch(error => {
                console.error("Error deleting area:", error);
            });
    };

    return (
        <div className='bg-white h-screen text-black'>
            <Navbar />
            <h1 className='text-2xl font-bold mt-4 mb-6 text-center'>My Areas</h1>
            <div className="flex flex-col items-center">
                {areas.map(area => (
                    <div key={area.id} className="border p-4 m-2 w-3/4 rounded shadow">
                        <h2 className="text-xl font-semibold">Area ID: {area.id}</h2>
                        <p><strong>Trigger ID:</strong> {area.triggerId}</p>
                        <p><strong>Trigger Data:</strong> {area.triggerData}</p>
                        <p><strong>Action ID:</strong> {area.actionId}</p>
                        <p><strong>Action Data:</strong> {area.actionData}</p>
                        <button onClick={() => deleteArea(area.id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
