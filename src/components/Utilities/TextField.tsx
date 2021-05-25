import { UserIcon, MailIcon, KeyIcon } from '@heroicons/react/solid';

interface Props {
    placeholder: string;
    type: string;
    label?: string | undefined;
    name?: string;
    required?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    icon?: "mail" | "user" | "password";
}

const TextField: React.FC<Props> = props => {
    const icon = props.icon === "mail" ? <MailIcon className="w-2/3 h-2/3" /> :
            props.icon === "user" ? <UserIcon className="w-2/3 h-2/3" /> :
            props.icon === "password" ? <KeyIcon className="w-2/3 h-2/3" /> :
            null;

    return (
        <div className="field w-full px-5 lg:px-4 xl:px-0">
            <label className="label font-normal">{props.label}</label>
            <div className="control has-icons-left">
                <input
                    className="input rounded-xl"
                    type={props.type}
                    placeholder={props.placeholder}
                    required={props.required}
                    ref={props.inputRef} />
                <span className="icon is-small is-left flex justify-center items-center">
                    {icon}
                </span>
            </div>
        </div>

    );
    // return (
    //     <div className="w-full border-box m-0 p-0 flex justify-center items-center">
    //         {labelText}
    //         <input type={props.type} className="w-full mx-8 my-4 py-3 px-12 rounded-xl bg-grey-darker font-body text-lg
    // placeholder-syntax-orange text-terminal-yellow font-body border-2 border-transparent focus:border-red outline-none"
    //             placeholder={props.placeholder} required={props.required} ref={props.inputRef} />
    //     </div>
    // )
}

export default TextField;