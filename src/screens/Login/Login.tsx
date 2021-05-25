import Navbar from '../../components/Navbars/Navbar';
import InputField from '../../components/Utilities/InputField';
import { UserIcon, KeyIcon } from '@heroicons/react/solid';
import SuccessButton from '../../components/Buttons/SuccessButton';
import Heading from '../../components/Utilities/Heading';
import Sidebar from '../../components/Utilities/Sidebar';
import { login } from '../../api/index';
import { authenticate, setUsername, setPermissionLevel, setId } from '../../store/userSlice';
import loginSchema from '../../schema/loginSchema';
import { motion } from 'framer-motion';
import { routeVariants } from '../../variants/index';

import { toast, Flip } from 'react-toastify';
import { useState, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthenticationIllustration from '../../assets/authentication-illustration.svg';
import classes from './Login.module.scss';
import ErrorMessage from '../../components/Utilities/ErrorMessage';

const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const history = useHistory();
    const dispatch = useDispatch();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        e.preventDefault();

        const { error } = loginSchema.validate({
            username,
            password,
        });

        // If there's a validation error, show error message, else send request.
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
                            // Redirect to / on successful login
                            history.push('/');
                        }
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
        <motion.section
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Navbar />
            <section className="flex flex-wrap w-screen h-screen box-border overflow-x-hidden scrollbar">
                {/* Sidebar */}
                <Sidebar
                    logo
                    description="Engage in meaningful cybersecurity discussions."
                    descriptionColor="grey-darker"
                    bgColor="yellow"
                    illustration={AuthenticationIllustration}
                />

                {/* Login div */}
                <div className="flex flex-1 justify-center items-center">
                    <div className={`w-11/12 md:w-3/5 2xl:w-2/5 m-4 py-3 sm:py-6 xl:py-10 xl:px-8 backdrop-filter backdrop-blur-3xl
        bg-grey-lighter rounded-3xl ${classes.Login} flex flex-col justify-start items-center`}>
                        <Heading>
                            Login to Backdoor
                        </Heading>
                        <form onSubmit={submitHandler} className="w-full mt-4 mb-2 mx-4 flex flex-col items-center">
                            <InputField placeholder="john.doe@example.com" type="text" name="username" required
                                label="Username or Email" inputRef={usernameRef} >
                                <UserIcon className="w-2/3 h-2/3" />
                            </InputField>

                            <InputField placeholder="Password" type="password" name="password" required
                                label="Password" inputRef={passwordRef} >
                                <KeyIcon className="w-2/3 h-2/3" />
                            </InputField>

                            <SuccessButton type="submit">Login</SuccessButton>
                        </form>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </div>
                </div>
            </section>
        </motion.section>
    );
}

export default Login;