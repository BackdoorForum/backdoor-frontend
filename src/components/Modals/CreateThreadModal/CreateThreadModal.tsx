import Backdrop from '../../Backdrop/Backdrop';
import Heading from '../../Utilities/Heading';
import InputField from '../../Utilities/InputField';
import ErrorMessage from '../../Utilities/ErrorMessage';
import ModalContainer from '../ModalContainer';
import SuccessButton from '../../Buttons/SuccessButton';
import threadSchema from '../../../schema/theadSchema';
import { createThread } from '../../../api/index';
import { AnimatePresence } from 'framer-motion';
import { useState, useRef, FormEvent } from 'react';
import { toast, Flip } from 'react-toastify';
import TextArea from '../../Utilities/TextArea';

interface Props {
    show: boolean;
    backdropClicked: () => void;
}

const CreateThreadModal: React.FC<Props> = props => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value as string;
        const description = descriptionRef.current?.value as string;

        const { error } = threadSchema.validate({
            title,
            description
        });

        if (error)
            setErrorMessage(error.message);
        else {
            setErrorMessage(undefined);
            createThread({ title, body: description })
                .then(res => {
                    toast.success(res.data.message, { transition: Flip })
                    props.backdropClicked();
                })
                .catch(err => toast.error(err.response.data.message, { transition: Flip }));
        }
    }

    return (
        <AnimatePresence>
            { props.show && (
                <Backdrop clicked={props.backdropClicked}>
                    <ModalContainer>
                        <Heading>Create Thread</Heading>
                        <form onSubmit={submitHandler}
                            className="mt-4 my-2 flex flex-col flex-1 w-full px-12">
                            <InputField placeholder="Thread Title" label="Thread Title" type="text"
                                inputRef={titleRef} required
                            />
                            <TextArea textAreaRef={descriptionRef} placeholder="Thread Description"
                                limit={185} label="Thread Description" required />
                            <div className="mt-4 flex justify-center align-center">
                                <SuccessButton type="submit">Create</SuccessButton>
                            </div>
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        </form>
                    </ModalContainer>
                </Backdrop>
            )}
        </AnimatePresence>
    );
}

export default CreateThreadModal;