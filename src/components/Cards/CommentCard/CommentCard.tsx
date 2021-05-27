import CardBody from '../CardBody';
import CardReactions from '../CardReactions';
import { getUsername } from '../../../api/index';
import { toast, Flip } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Props {
    id: string;
    user: string;
    body: string;
    votes: [string];
    downVotes: [string];
    date: string;
}

const CommentCard: React.FC<Props> = props => {
    const [username, setUsername] = useState<string>();
    const history = useHistory();
    const createdAt = new Date(props.date).toUTCString().slice(0, -13);

    useEffect(() => {
        getUsername(props.user)
            .then(res => setUsername(res.data.username))
            .catch(err => {
                toast.error(err.response.data.message, { transition: Flip });
                history.goBack();
            })
    }, [history, props.user]);

    return (
        <div className="flex flex-col justify-around w-11/12 md:w-9/12 xl:w-7/12 rounded-2xl bg-grey-lighter 
            mt-4 box-border">

            <div className="w-full flex justify-between items-center xl:mt-7 text-lg text-grey-light
            px-8 pt-8 md:px-12 md:pt-12 xl:px-12 xl:py-2">
                <Link to={`/users/${username}`}>
                    <p className="font-bold hover:underline">By: {username}</p>
                </Link>
                <p>{createdAt}</p>
            </div>

            <div className="px-8 md:px-12 xl:px-12">
                <CardBody>
                    {props.body}
                </CardBody>
            </div>
            <CardReactions
                id={props.id}
                comment
                votes={props.votes}
                downVotes={props.downVotes}
            />
        </div>
    );
}

export default CommentCard;