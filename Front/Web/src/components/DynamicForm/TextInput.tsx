type TextInputProps = {
    return: string;
    placeholder: string;
    updateData: (key: string, value: any) => void;
};

const TextInput: React.FC<TextInputProps> = ({ return: returnKey, placeholder, updateData }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        updateData(returnKey, value);
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default TextInput;
