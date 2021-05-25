import { useState } from 'react';

interface Props {
    placeholder?: string;
    textAreaRef?: React.RefObject<HTMLTextAreaElement>
    required?: boolean;
    limit: Number;
    label?: string;
}

const TextArea: React.FC<Props> = props => {
    const [contentLength, setContentLength] = useState<Number>(0);
    const [textColor, setTextColor] = useState<string>("grey-light");

    const fieldOnChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setContentLength(e.currentTarget.value.length);
        if (e.currentTarget.value.length <= props.limit) {
            setTextColor("grey-light");
        } else {
            setTextColor("red");
        }
    }

    return (
        <div className="flex flex-1 flex-col items-end">
            <div className="flex w-full justify-between my-2 text-md">
                <p className={`text-syntax-yellow`}>{props.label}</p>
                <p className={`text-${textColor}`}>{contentLength} / {props.limit}</p>
            </div>
            <textarea className="textarea rounded-2xl w-full"
                placeholder={props.placeholder}
                onChange={fieldOnChangeHandler}
                ref={props.textAreaRef} required={props.required}
            />
        </div>
    );
}

export default TextArea;