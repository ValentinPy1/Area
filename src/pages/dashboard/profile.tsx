import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';

interface ProfileData {
    username: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const myFetch = useBearerFetch();
    const [profile, setProfile] = useState<any>(null); // Define the type for profile if known
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/auth/me';

        myFetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
                setUsername(data.username);
                setEmail(data.email);
                setPassword(data.password);
            })
            .catch((error) => console.error(error));
    }, [myFetch]);

    return (
        <div className="bg-white h-screen text-black">
            <Navbar />
            <div className="flex flex-col justify-center items-center h-3/4 text-center">
                <div className="w-2/12">
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-4xl" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-4xl" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-4xl" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a className="text-blue-500 block mt-2" href="/change-password">
                            Change Password
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
