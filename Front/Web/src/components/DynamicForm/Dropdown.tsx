import { useEffect } from "react";

type DropdownInputProps = {
    name: string;
    object: string[];
    render: string;
    return: string;
    choices: { render: string; returnKey: string }[];
    updateData: (key: string, value: any) => void;
};

const DropdownInput: React.FC<DropdownInputProps> = ({ name, object, render, return: returnKey, choices, updateData }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = choices.find(choice => choice[render] === selectedValue);
        if (selectedOption) {
            updateData(returnKey, selectedOption[returnKey]);
        }
    };

    useEffect(() => {
        if (choices.length > 0) {
            updateData(returnKey, choices[0][returnKey]);
        }
    }, []);

    return (
        <select name={name} onChange={handleChange}>
            {choices.map((choice, index) => (
                <option key={index} value={choice[render]}>
                    {choice[render]}
                </option>
            ))}
        </select>
    );
}

export default DropdownInput;
