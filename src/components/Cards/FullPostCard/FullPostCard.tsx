import CardTitle from "../CardTitle";
import CardBody from "../CardBody";
import PostCardReactions from '../PostCardReactions';

interface Props {
    id: string;
    title: string;
    body: string
    votes: [string];
    downVotes: [string];
}

const FullPostCard: React.FC<Props> = props => {
    return (
        <div
            className="flex flex-col justify-around w-11/12 md:w-9/12 xl:w-7/12 rounded-2xl bg-grey-lighter 
            my-8 box-border"
        >
            {/* Post title and body */}
            <div className="px-8 pt-8 md:px-12 md:pt-12 xl:px-12 xl:pt-8">
                <CardTitle>
                    {props.title}
                </CardTitle>

                <hr className="mb-4 border-red-lighter" />

                <CardBody>
                    {props.body}
                </CardBody>
            </div>

            <PostCardReactions
                id={props.id}
                votes={props.votes}
                downVotes={props.downVotes}
            />
        </div >
    );
}

export default FullPostCard;