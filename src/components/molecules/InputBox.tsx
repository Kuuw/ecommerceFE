import Input from "../atoms/Input";

interface InputBoxProps {
    type: string;
    placeholder: string;
    name: string;
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const InputBox = ({ type, placeholder, name, onValueChange, value }: InputBoxProps) => {
    return (
        <div className="mb-6">
            <Input
                type={type}
                placeholder={placeholder}
                name={name}
                className="w-full rounded-md border bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                onChange={onValueChange}
                value={value}
            />
        </div>
    );
};

export default InputBox;