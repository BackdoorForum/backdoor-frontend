import { ArrowUpIcon, ArrowDownIcon, AnnotationIcon } from '@heroicons/react/solid';
import { IStore } from '../../store/userInterface';
import { Link } from 'react-router-dom';
import { reactPost } from '../../api/index';
import { toast, Flip } from "react-toastify";
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    id: string;
    votes: [string];
    downVotes: [string]
    showComments?: boolean;
    threadName?: string
}

const PostCardReactions: React.FC<Props> = props => {
    const [votes, setVotes] = useState<[string]>();
    const [downVotes, setDownVotes] = useState<[string]>();
    const [userUpvoted, setUserUpvoted] = useState(false);
    const [userDownvoted, setUserDownvoted] = useState(false);
    const userId = useSelector<IStore>(state => state.user.id) as string;

    const updateVotes = useCallback((passedVotes: [string], passedDownVotes: [string]) => {
        if (passedVotes.includes(userId)) {
            setUserUpvoted(true);
            setUserDownvoted(false);
        } else if (passedDownVotes.includes(userId)) {
            setUserUpvoted(false);
            setUserDownvoted(true);
        } else {
            setUserUpvoted(false);
            setUserDownvoted(false);
        }
    }, [userId]);

    useEffect(() => {
        setVotes(props.votes);
        setDownVotes(props.downVotes);
        updateVotes(props.votes, props.downVotes);
    }, [props.votes, props.downVotes, userId, updateVotes]);

    const likePostHandler = () => {
        reactPost(props.id, 'like')
            .then(res => {
                setVotes(res.data.votes);
                setDownVotes(res.data.downVotes);
                updateVotes(res.data.votes, res.data.downVotes);
            })
            .catch(err => toast.error(err.response.data.message, { transition: Flip }));
    }

    const dislikePostHandler = () => {
        reactPost(props.id, 'dislike')
            .then(res => {
                setVotes(res.data.votes);
                setDownVotes(res.data.downVotes);
                updateVotes(res.data.votes, res.data.downVotes);
            })
            .catch(err => toast.error(err.response.data.message, { transition: Flip }));
    }

    // {/* Post actions (Like, Dislike, etc) */ }
    return (
        <div className="max-h-min flex justify-between items-center mt-4 px-8 py-4 md:px-12 md:py-6
            xl:px-12 xl:py-4 bg-grey rounded-b-2xl">
            <div className="flex justify-start items-center">
                {userUpvoted ? (
                    <ArrowUpIcon className="w-7 text-red-lighter hover:text-white cursor-pointer"
                        onClick={likePostHandler}
                    />) : (
                    <ArrowUpIcon className="w-7 text-white hover:text-red-lighter cursor-pointer"
                        onClick={likePostHandler}
                    />
                )}
                < p className="mx-4 text-grey-light">{votes?.length}</p>

                {userDownvoted ? (
                    <ArrowDownIcon className="w-7 text-syntax-purple hover:text-white cursor-pointer"
                        onClick={dislikePostHandler}
                    />) : (
                    <ArrowDownIcon className="w-7 text-white hover:text-syntax-purple cursor-pointer"
                        onClick={dislikePostHandler}
                    />
                )}
                < p className="mx-4 text-grey-light">{downVotes?.length}</p>
            </div>
            {props.showComments && (
                <Link to={`/threads/${props.threadName}/${props.id}`}>
                    <div className="flex justify-start items-center text-grey-light hover:text-red-lighter">
                        <AnnotationIcon className="w-8" />
                        <p className="mx-4 hidden md:block">Comments</p>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default PostCardReactions;