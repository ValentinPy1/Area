import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';

type Area = {
    id: string;
    name: string;
    userId: string;
    triggerId: string;
    triggerData: { [key: string]: string };
    actionId: string;
    actionData: { [key: string]: string };
    triggerName: string;
    actionName: string;
};

export default function MyAreas() {
    const [areas, setAreas] = useState<Area[]>([]);
    const bearerFetch = useBearerFetch();

    useEffect(() => {
        fetchAreas();
    }, []);

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
        <div className='bg-gray-100 min-h-screen text-white'>
            <Navbar />
            <h1 className='text-5xl font-bold mt-8 mb-6 text-center text-black'>My Areas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {areas.map(area => (
                    <div key={area.id} className="bg-white border p-4 m-2 rounded-xl shadow-lg justify-center items-center flex-col flex">
                        <h2 className="text-3xl font-semibold mb-2 w-full text-black text-center">{area.name}</h2>
                        <div className='flex-col justify-between w-full mb-2 bg-cyan-500 p-5 rounded-xl'>
                            <p className="mb-2 text-2xl text-center"><strong>{area.triggerName}</strong> </p>
                            <div className="ml-4">
                                {Object.entries(area.triggerData).map(([key, value], idx) => (
                                    <div>
                                        <p key={idx} className="text-center"><strong>{key} :</strong>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex-col justify-between w-full mb-2  bg-blue-500 p-5 rounded-xl'>
                            <p className="mb-2 text-2xl w-full justify-center text-center"><strong>{area.actionName}</strong> </p>
                            <div className="ml-4">
                                {Object.entries(area.actionData).map(([key, value], idx) => (
                                    <div>
                                        <p key={idx} className="text-center"><strong>{key} :</strong>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => deleteArea(area.id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
