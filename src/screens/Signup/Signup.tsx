import Navbar from '../../components/Navbars/Navbar';
import TextField from '../../components/Utilities/TextField';
import SuccessButton from '../../components/Buttons/SuccessButton';
import Heading from '../../components/Utilities/Heading';
import Sidebar from '../../components/Utilities/Sidebar';
import { signUp } from '../../api/index';
import registrationSchema from '../../schema/registrationSchema';
import { motion } from 'framer-motion';
import { routeVariants } from '../../variants/index';

import { toast, Flip } from 'react-toastify';
import { useState, useRef, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import SecureLoginIllustration from '../../assets/securelogin-illustration.svg';
import classes from './Signup.module.scss';
import ErrorMessage from '../../components/Utilities/ErrorMessage';

const Signup: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const history = useHistory();

    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        e.preventDefault();

        const { error } = registrationSchema.validate({
            email,
            username,
            password,
            confirmPassword
        });

        // If there's a validation error, show error message, else send request.
        if (error) {
            setErrorMessage(error.message);
            return;
        } else {
            setErrorMessage(undefined);
            signUp({ email, username, password })
                .then(res => {
                    toast.success(res.data.message, {
                        onOpen: () => history.push('/'),
                        transition: Flip
                    });
                })
                .catch(err => {
                    if (err.response.status === 500) {
                        toast.error("Server unreachable",
                            { transition: Flip }
                        );
                    } else {
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
            {/* Add pt-16 to this section if navbar is fixed instead of sticky */}
            <section className="flex flex-wrap w-screen h-screen box-border overflow-x-hidden scrollbar">
                <Sidebar
                    logo
                    description="Engage in meaningful cybersecurity discussions."
                    descriptionColor="grey-darker"
                    bgColor="yellow"
                    illustration={SecureLoginIllustration}
                />

                {/* Signup div */}
                <div className="flex flex-1 justify-center items-center mt-8 mb-20">
                    <div className={`w-11/12 md:w-3/5 2xl:w-2/5 m-4 py-3 sm:py-6 xl:py-10 xl:px-8
        bg-grey-lighter rounded-3xl ${classes.Signup} flex flex-col justify-start items-center`}>
                        <Heading>
                            Get your access to Backdoor
                        </Heading>
                        <form onSubmit={submitHandler} className="w-full mt-4 mb-2 mx-4 flex flex-col items-center">
                            <TextField placeholder="john.doe@example.com" type="email" name="email" required
                                label="Email" inputRef={emailRef} icon="mail" />
                            <TextField placeholder="johndoe" type="text" name="username" required
                                label="Username" inputRef={usernameRef} icon="user" />
                            <TextField placeholder="Password" type="password" name="password" required
                                label="Password" inputRef={passwordRef} icon="password" />
                            <TextField placeholder="Confirm Password" type="password" required
                                label="Confirm Password" inputRef={confirmPasswordRef} icon="password" />
                            <SuccessButton type="submit">Sign Up</SuccessButton>
                        </form>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </div>
                </div>
            </section>
        </motion.section>
    );
}

export default Signup;