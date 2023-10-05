import React, { useState, useEffect } from 'react';
import { useBearerFetch } from '@/Utils/bearerFetch';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

type Service = {
    name: string;
    logo: string;
    color: string;
    description: string;
};

const ServicesGrid: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const myFetch = useBearerFetch();

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/actrig/getservices';

        myFetch(apiUrl)
            .then((response) => response.json())
            .then((data: Service[]) => {
                console.log(data);
                setServices(data);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });
    }, [myFetch]);

    return (
        <div className='flex flex-col justify-center items-center h-3/4'>
            <SearchBar onSearch={() => { }} />
            <div className="grid grid-cols-4 gap-4 p-4 w-4/12">
                {services.map((service, index) => (
                    <Link
                        key={index}
                        href={{
                            pathname: `/service/${service.name}`,
                            query: { service: JSON.stringify(service) }
                        }}
                        className={`p-4 rounded-xl text-white justify-center items-center flex flex-col font-bold cursor-pointer h-32 w-32 text-xl`}
                        style={{ backgroundColor: service.color }}
                    >
                        <div>{service.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ServicesGrid;
