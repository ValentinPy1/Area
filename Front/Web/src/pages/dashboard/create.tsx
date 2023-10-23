import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';
import PartBox from '@/components/PartBox';
import ServicesGrid from '@/components/ServicesGrid';
import ItemSelection from '@/components/Creation/ItemSelection';
import DynamicForm from '@/components/DynamicForm/DynamicForm';
import { Service } from '@/Utils/types';

export default function Create() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedTrigger, setSelectedTrigger] = useState<any | null>(null);
    const [selectedAction, setSelectedAction] = useState<any | null>(null);
    const [showServices, setShowServices] = useState(false);
    const [triggerData, setTriggerData] = useState<string>('');
    const [actionData, setActionData] = useState<string>('');
    const myFetch = useBearerFetch();
    const [selecting, setSelecting] = useState<'triggers' | 'actions' | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [areaName, setAreaName] = useState<string>('');

    const handleItemSelect = (item: any) => {
        setSelectedItem(item);
    };

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setSelectedItem(null);
    };

    const handleReturn = () => {
        setShowServices(false);
        setSelectedService(null);
        setSelectedItem(null);
    };

    const generateArea = () => {
        if (!selectedTrigger || !selectedAction) {
            alert("Please select both a trigger and an action before generating an Area.");
            return;
        }

        const apiUrl = 'http://localhost:8080/task/new';
        const payload = {
            name: areaName,
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
                alert("Area generated successfully!");
            })
            .catch(error => {
                console.error("Error generating area:", error);
                alert("Error generating area. Please try again.");
            });
    };

    return (
        <div className="bg-white h-screen">
            {!showServices && <Navbar />}
            {showServices ? (
                <div className='flex flex-col items-center h-screen'>
                    <button
                        onClick={handleReturn}
                        className="ml-10 mt-10 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 self-start"
                    >
                        Return
                    </button>
                    <div className="flex flex-row items-center h-full justify-around">
                        <ServicesGrid onServiceClick={handleServiceClick} />
                        {selectedService && (
                            < ItemSelection
                                service={selectedService}
                                dataType={selecting}
                                onItemSelect={handleItemSelect}
                            />
                        )}
                        {selectedItem && (
                            <div className='bg-white p-4 rounded-lg shadow-lg text-center justify-center items-center m-10' style={{ background: selectedService.color }}>
                                <h2 className='text-xl font-bold mb-4 text-white'>{selectedItem.name}</h2>
                                {selecting === 'triggers' ? (
                                    <DynamicForm inputJson={selectedItem.toSend} setData={setTriggerData} />
                                ) : (
                                    <DynamicForm inputJson={selectedItem.toSend} setData={setActionData} />
                                )}
                                <button className="mt-4 bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition duration-300 self-start" onClick={() => {
                                    if (selecting === 'triggers') {
                                        setSelectedTrigger(selectedItem);
                                    } else {
                                        setSelectedAction(selectedItem);
                                    }
                                    handleReturn();
                                }}>
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // Otherwise, render the main content
                <div className="flex flex-row items-center justify-center mt-20">
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-3/4 mb-10 text-center text-black"
                            placeholder="Area Name"
                            onChange={(e) => setAreaName(e.target.value)}
                        />
                        <PartBox
                            color="bg-blue-500"
                            title="If"
                            selectedPart={selectedTrigger}
                            placeHolder="Trigger"
                            onButtonClick={() => {
                                setShowServices(true);
                                setSelecting('triggers');
                            }}
                            onInputChange={setTriggerData}
                        />
                        <div className="border-l-4 border-gray-300 h-12 mx-auto"></div>
                        <PartBox
                            color="bg-green-500"
                            title="Then"
                            selectedPart={selectedAction}
                            placeHolder="Action"
                            onButtonClick={() => {
                                setShowServices(true);
                                setSelecting('actions');
                            }}
                            onInputChange={setActionData}
                        />
                    </div>
                </div>
            )}
            {!showServices && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={generateArea}
                        className="bg-neutral-700 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300"
                    >
                        Generate Area
                    </button>
                </div>
            )}
        </div>
    );
}
