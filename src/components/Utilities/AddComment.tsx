import InputField from './InputField';
import SuccessButton from '../Buttons/SuccessButton';
import { createComment } from '../../api/index';
import { toast, Flip } from 'react-toastify';
import { FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
    postId: string;
}

const AddComment: React.FC = props => {
    const params = useParams<RouteParams>();
    const postId = params.postId;
    const commentRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = commentRef.current?.value as string;
        createComment(postId, { body: comment })
            .then(res => toast.success(res.data.message, { transition: Flip }))
            .catch(err => toast.error(err.response.data.message, { transition: Flip }));
    }
    return (
        <div className="p-5 flex bg-grey-lighter justify-center items-center w-11/12 md:w-9/12 xl:w-7/12 
        mb-4 rounded-2xl">
            <form onSubmit={submitHandler} className="flex flex-1 flex-wrap justify-around items-center">
                <InputField
                    placeholder="Add Comment"
                    type="text"
                    inputRef={commentRef}
                    required
                />
                <div className="mx-5">
                    <SuccessButton type="submit">Comment</SuccessButton>
                </div>
            </form>
        </div>
    );
}

export default AddComment;