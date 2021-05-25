import Backdrop from '../../Backdrop/Backdrop';
import Heading from '../../Utilities/Heading';
import InputField from '../../Utilities/InputField';
import { MailIcon, KeyIcon } from '@heroicons/react/solid';
import SuccessButton from '../../Buttons/SuccessButton';
import loginSchema from '../../../schema/loginSchema';
import { authenticate, setId, setPermissionLevel, setUsername } from '../../../store/userSlice';
import { login } from '../../../api/index';
import { AnimatePresence } from 'framer-motion';
import ModalContainer from '../ModalContainer';

import { useRef, useState, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ErrorMessage from '../../Utilities/ErrorMessage';


interface Props {
    show: boolean;
    backdropClicked: () => void;
}

const LoginModal: React.FC<Props> = props => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const { error } = loginSchema.validate({
            username,
            password
        });

        if (error) {
            setErrorMessage(error.message);
            return;
        } else {
            setErrorMessage(undefined);
            login({
                username,
                password
            })
                .then(res => {
                    // Set global application state to indicate that user is authenticated.
                    dispatch(authenticate());
                    // Save user data in global state
                    dispatch(setId(res.data.id));
                    dispatch(setUsername(res.data.username));
                    dispatch(setPermissionLevel(res.data.permissionLevel));

                    toast.success(res.data.message, {
                        onOpen: () => {
                            // If we're on the signup page, redirect on login
                            // Else, just close the modal
                            if (location.pathname === "/signup" ||
                                location.pathname === "/login") {
                                props.backdropClicked();
                                history.push('/');
                            }
                            else
                                props.backdropClicked()
                        },
                        transition: Flip
                    });
                })
                .catch(err => {
                    switch (err.response.status) {
                        case 500:
                            toast.error("Server unreachable", { transition: Flip });
                            break;
                        case 401:
                            toast.error("Username or password incorrect", { transition: Flip });
                            break;
                        default:
                            toast.error(err.response.data.message, { transition: Flip });
                    }
                });
        }
    }

    return (
        <AnimatePresence>
            {props.show && (
                <Backdrop clicked={props.backdropClicked}>
                    <ModalContainer>
                        <Heading> Login </Heading>
                        <form onSubmit={submitHandler} className="mt-4 my-2 flex flex-col flex-1">
                            <InputField
                                label="Email or Username"
                                placeholder="john.doe@example.com"
                                type="text"
                                inputRef={usernameRef}
                            >
                                <MailIcon className="w-2/3 h-2/3" />
                            </InputField>
                            <InputField
                                label="Password"
                                placeholder="Password"
                                type="password"
                                inputRef={passwordRef}
                            >
                                <KeyIcon className="w-2/3 h-2/3" />
                            </InputField>
                            <div className="mt-4 flex justify-center align-center">
                                <SuccessButton type="submit">Login</SuccessButton>
                            </div>
                        </form>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </ModalContainer>
                </Backdrop>
            )}
        </AnimatePresence>
    );
}

export default LoginModal;