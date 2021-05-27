import { Link, useParams } from 'react-router-dom';
import CardTitle from "../CardTitle";
import CardReactions from '../CardReactions';

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
    const threadName = params.threadName;

    return (
        <div

            className="flex flex-col justify-around w-11/12 md:w-10/12 xl:w-9/12 2xl:w-8/12
            rounded-2xl bg-grey-lighter my-8 box-border"
        >
            {/* Post title and body */}
            <div className="px-8 pt-8 md:px-12 md:pt-12 xl:px-12 xl:pt-8 cursor-pointer">
                <Link to={`/threads/${threadName}/${props.id}`}>
                    <CardTitle>
                        {props.title}
                    </CardTitle>

                    <hr className="mb-4 border-red-lighter" />

                    <CardBody>
                        {props.body}
                    </CardBody>
                </Link>
            </div>
            <CardReactions
                id={props.id}
                votes={props.votes}
                downVotes={props.downVotes}
                showComments
                threadName={threadName}
            />
        </div >
    );
}

export default PostCard;