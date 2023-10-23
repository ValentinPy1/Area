import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import ChangePasswordPopup from '@/components/ChangePasswordPopup';

interface ProfileData {
    username: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const myFetch = useBearerFetch();
    const [profile, setProfile] = useState<any>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
    const router = useRouter();
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

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
    }, []);

    const handleLogout = async () => {
        const logoutApiUrl = 'http://localhost:8080/auth/logout';
        try {
            await myFetch(logoutApiUrl, {
                method: 'POST',
            });
            removeCookie('authorization');
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePassword = async (oldPassword: string, newPassword: string) => {
        const changePasswordApiUrl = 'http://localhost:8080/auth/changepswd';
        try {
            const response = await myFetch(changePasswordApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.authorization}`,
                },
                body: JSON.stringify({
                    oldpassword: oldPassword,
                    newpassword: newPassword,
                }),
            });
            if (response.ok) {
                console.log('Password changed successfully');
                setShowChangePasswordPopup(false);
            } else {
                const errorData = await response.json();
                console.error('Password change error:', errorData);
            }
        } catch (error) {
            console.error('Password change error:', error);
        }
    };


    return (
        <div className="bg-gray-100 h-screen text-black">
            <Navbar />
            <div className="flex flex-col justify-center items-center h-3/4 text-center">
                <div className="w-96">
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-2xl" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="border-2 border-gray-300 w-full p-2 rounded-lg text-center text-lg focus:outline-none focus:border-blue-500"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-2xl" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border-2 border-gray-300 w-full p-2 rounded-lg text-center text-lg focus:outline-none focus:border-blue-500"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-2xl" htmlFor="password">
                            Password
                        </label>
                        <p
                            className="border-2 border-gray-300 w-full p-2 rounded-lg text-center text-lg focus:outline-none focus:border-blue-500"
                            id="password"
                        />
                        <p className="text-blue-500 block mt-2 cursor-pointer" onClick={() => setShowChangePasswordPopup(true)} >
                            Change Password
                        </p>
                    </div>
                    <button
                        className="mt-4 bg-red-500 text-white p-2 pl-4 pr-4 rounded-full hover:bg-red-600 transition-colors"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                {showChangePasswordPopup && (
                    <ChangePasswordPopup
                        onClose={() => setShowChangePasswordPopup(false)}
                        onChangePassword={handleChangePassword}
                    />
                )}
            </div>
        </div>
    );
}

export default Profile;
