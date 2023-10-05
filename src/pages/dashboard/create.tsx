import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';
import ServiceSelection from '@/components/ServiceSelection';
import PartBox from '@/components/PartBox';

type Service = {
    name: string;
    logo: string;
    color: string;
    description: string;
    triggers?: string[];
};

export default function Create() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedTrigger, setSelectedTrigger] = useState<any | null>(null);
    const [selectedAction, setSelectedAction] = useState<any | null>(null);
    const [showServices, setShowServices] = useState('none');
    const [triggerData, setTriggerData] = useState<string>('');
    const [actionData, setActionData] = useState<string>('');
    const myFetch = useBearerFetch();

    const generateArea = () => {
        if (!selectedTrigger || !selectedAction) {
            alert("Please select both a trigger and an action before generating an Area.");
            return;
        }

        const apiUrl = 'http://localhost:8080/task/new';
        const payload = {
            triggerid: selectedTrigger.id,
            actionid: selectedAction.id,
            triggerdata: triggerData,
            actiondata: actionData
        };

        myFetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data if needed
                alert("Area generated successfully!");
            })
            .catch(error => {
                console.error("Error generating area:", error);
                alert("Error generating area. Please try again.");
            });
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/actrig/getservices';

        myFetch(apiUrl)
            .then((response) => response.json())
            .then((data: Service[]) => {
                setServices(data);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });
    }, [myFetch]);

    return (
        <div className="bg-white h-screen">
            <Navbar />
            <h1 className="text-black text-2xl font-bold mt-4 mb-6 text-center"></h1>
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <PartBox
                        color="blue"
                        title="If"
                        buttonText={selectedTrigger ? selectedTrigger.name : "Trigger"}
                        onButtonClick={() => setShowServices('trigger')}
                        inputData={triggerData}
                        onInputChange={setTriggerData}
                    />
                    <div className="border-l-4 border-gray-300 h-12 mx-auto"></div>
                    <PartBox
                        color="green"
                        title="Then"
                        buttonText={selectedAction ? selectedAction.name : "Action"}
                        onButtonClick={() => setShowServices('action')}
                        inputData={actionData}
                        onInputChange={setActionData}
                    />
                </div>
                {showServices !== 'none' && (
                    <ServiceSelection
                        services={services}
                        selectedService={selectedService}
                        onBack={() => setSelectedService(null)}
                        onClose={() => setShowServices('none')}
                        onServiceClick={(service) => setSelectedService(service)}
                        onSelectPart={(part) => {
                            if (showServices === 'trigger') {
                                setSelectedTrigger(part);
                            } else {
                                setSelectedAction(part);
                            }
                        }}
                        partType={showServices}
                    />
                )}
            </div>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={generateArea}
                    className="bg-neutral-700 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300"
                >
                    Generate Area
                </button>
            </div>
        </div>
    );
}
