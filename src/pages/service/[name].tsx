import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

type Service = {
    name: string;
    logo: string;
    color: string;
    description: string;
};

const ServiceDetail: React.FC = () => {
    const router = useRouter();
    if (!router.query.service) {
        return <div></div>;
    }
    const service: Service = JSON.parse(router.query.service as string);

    return (
        <div className='bg-white h-screen'>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-3/4 ' style={{ backgroundColor: service.color }}>
                <h1 className="text-white font-bold text-7xl">{service?.name}</h1>
                <p className="text-white mt-4 text-xl">{service?.description}</p>
            </div>
        </div>
    );
};

export default ServiceDetail;
