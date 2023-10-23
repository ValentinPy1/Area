import React, { useState } from 'react';

interface ChangePasswordPopupProps {
    onClose: () => void;
    onChangePassword: (oldPassword: string, newPassword: string) => void;
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ onClose, onChangePassword }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = () => {
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match');
            return;
        }

        onChangePassword(oldPassword, newPassword);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-lg font-semibold mb-2">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-lg font-semibold mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmNewPassword" className="block text-lg font-semibold mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 ml-4 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
