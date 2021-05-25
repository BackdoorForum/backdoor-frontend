interface Props {
    placeholder: string;
    type: "email" | "text" | "password";
    label?: string | undefined;
    name?: string;
    required?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
}

const InputField: React.FC<Props> = props => {
    const icon = props.children;
    let leftIconClass;
    if (icon) {
        leftIconClass = "has-icons-left"
    }

    return (
        <div className="field w-full px-5 lg:px-4 xl:px-0">
            <label className="label font-normal">{props.label}</label>
            <div className={`control ${leftIconClass}`}>
                <input
                    className="input rounded-xl"
                    type={props.type}
                    placeholder={props.placeholder}
                    required={props.required}
                    ref={props.inputRef} />
                {icon && (
                    <span className="icon is-small is-left flex justify-center items-center">
                        {icon}
                    </span>
                )}
            </div>
        </div>

    );
}

export default InputField;