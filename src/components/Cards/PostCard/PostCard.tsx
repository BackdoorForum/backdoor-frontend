import { motion } from "framer-motion"
import { cardVariants } from '../../../variants/index';
import { reactPost } from '../../../api/index';
import { Link, useParams } from 'react-router-dom';
import CardTitle from "../CardTitle";
import { ChevronUpIcon, ChevronDownIcon, AnnotationIcon } from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../../store/userInterface';
import classes from './PostCard.module.scss';

import { toast, Flip } from "react-toastify";
import CardBody from "../CardBody";

interface Props {
    id: string;
    title: string;
    body: string
    votes: [string];
    downVotes: [string];
}

interface RouteParams {
    threadName: string;
}

const PostCard: React.FC<Props> = props => {
    const params = useParams<RouteParams>();
    const [votes, setVotes] = useState<[string]>();
    const [downVotes, setDownVotes] = useState<[string]>();
    const [userUpvoted, setUserUpvoted] = useState(false);
    const [userDownvoted, setUserDownvoted] = useState(false);

    const userId = useSelector<IStore>(state => state.user.id) as string;

    const threadName = params.threadName;
    let postBody;
    if (props.body.length > 250) {
        postBody = props.body.substring(0, 250) + "..."
    } else {
        postBody = props.body;
    }

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

    return (
        <motion.div
            className={`flex flex-col justify-around w-11/12 md:w-10/12 xl:w-9/12 2xl:w-8/12 cursor-pointer
            ${classes.PostCard} rounded-2xl bg-grey-lighter my-8 box-border`}
            variants={cardVariants}
            whileHover="hover"
        >
            {/* Post title and body */}
            <div className="px-8 pt-8 md:px-12 md:pt-12 xl:px-12 xl:pt-8">
                <Link to={`/threads/${threadName}/${props.id}`}>
                    <CardTitle>
                        {props.title}
                    </CardTitle>

                    <hr className="mb-4 border-red-lighter" />

                    <CardBody>
                        {postBody}
                    </CardBody>
                </Link>
            </div>

            {/* Post actions (Like, Dislike, etc) */}
            <div className="max-h-min flex justify-between items-center mt-4 px-8 py-4 md:px-12 md:py-6 
            xl:px-12 xl:py-4 bg-grey rounded-b-2xl">
                <div className="flex justify-start items-center">
                    {userUpvoted ? (
                        <ChevronUpIcon className="w-8 text-red-lighter hover:text-white"
                            onClick={likePostHandler}
                        />) : (
                        <ChevronUpIcon className="w-8 text-white hover:text-red-lighter"
                            onClick={likePostHandler}
                        />
                    )}
                    < p className="mx-4 text-grey-light">{votes?.length}</p>

                    {userDownvoted ? (
                        <ChevronDownIcon className="w-8 text-syntax-purple hover:text-white"
                            onClick={dislikePostHandler}
                        />) : (
                        <ChevronDownIcon className="w-8 text-white hover:text-syntax-purple"
                            onClick={dislikePostHandler}
                        />
                    )}
                    < p className="mx-4 text-grey-light">{downVotes?.length}</p>
                </div>
                <div className="flex justify-start items-center text-grey-light hover:text-red-lighter">
                    <AnnotationIcon className="w-8" />
                    <p className="mx-4 hidden md:block">Comments</p>
                </div>
            </div>
        </motion.div >
    );
}

export default PostCard;