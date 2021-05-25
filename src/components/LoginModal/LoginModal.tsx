import Backdrop from '../Backdrop/Backdrop';
import Heading from '../Utilities/Heading';
import TextField from '../Utilities/TextField';
import SuccessButton from '../Buttons/SuccessButton';
import loginSchema from '../../schema/loginSchema';
import { authenticate, setId, setPermissionLevel, setUsername } from '../../store/userSlice';
import { login } from '../../api/index';
import { AnimatePresence, motion } from 'framer-motion';
import { modalVariants } from '../../variants';

import { useRef, useState, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';

import { useDispatch } from 'react-redux';
import ErrorMessage from '../Utilities/ErrorMessage';

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
                <Backdrop clicked={props.backdropClicked} >
                    <motion.div className="flex flex-col justify-center items-center bg-grey-lighter rounded-2xl
                w-10/12 sm:w-3/5 md:w-2/5 2xl:w-4/12 m-4 py-4 sm:py-6 xl:py-10 xl:px-8"
                        onClick={e => e.stopPropagation()}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Heading> Login </Heading>
                        <form onSubmit={submitHandler} className="mt-4 my-2 flex flex-col flex-1">
                            <TextField
                                label="Email or Username"
                                placeholder="john.doe@example.com"
                                type="text"
                                icon="user"
                                inputRef={usernameRef}
                            />
                            <TextField
                                label="Password"
                                placeholder="Password"
                                type="password"
                                icon="password"
                                inputRef={passwordRef}
                            />
                            <div className="mt-4 flex justify-center align-center">
                                <SuccessButton type="submit">Login</SuccessButton>
                            </div>
                        </form>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </motion.div>
                </Backdrop>
            )}
        </AnimatePresence>
    );
}

export default LoginModal;