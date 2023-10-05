import React from 'react';

type PartBoxProps = {
    color: string;
    title: string;
    buttonText: string;
    onButtonClick: () => void;
    inputData: string;
    onInputChange: (value: string) => void;
};

const PartBox: React.FC<PartBoxProps> = ({ color, title, buttonText, onButtonClick, inputData, onInputChange }) => {
    return (
        <div className={`bg-${color}-500 w-96 h-64 flex flex-col items-center justify-center text-white text-3xl font-bold rounded-3xl`}>
            <p>{title}</p>
            <button onClick={onButtonClick} className="mt-4 bg-white text-neutral-500 px-4 py-2 rounded-full hover:bg-neutral-100">{buttonText}</button>
            <input
                type="text"
                placeholder={`Enter ${title.toLowerCase()} data`}
                value={inputData}
                onChange={(e) => onInputChange(e.target.value)}
                className="mt-4 p-2 rounded border text-xl text-neutral-500"
            />
        </div>
    );
};

export default PartBox;
