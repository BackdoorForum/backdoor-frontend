import Navbar from '../../components/Navbars/Navbar';
import { toast, Flip } from 'react-toastify';
import { fetchPost, fetchCommentsBySearch } from '../../api/index';
import { IPost } from '../../api/modelsInterface';
import { motion } from 'framer-motion'
import { routeVariants } from '../../variants/index';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FullPostCard from '../../components/Cards/FullPostCard/FullPostCard';
import PageBody from '../../components/Utilities/PageBody';

interface RouteParams {
    postId: string;
}

const PostDetails: React.FC = props => {
    const [post, setPost] = useState<IPost>();
    const [comments, setComments] = useState();
    const history = useHistory();
    const params = useParams<RouteParams>();
    const postId = params.postId;

    useEffect(() => {
        fetchPost(postId)
            .then(res => setPost(res.data))
            .catch(err => {
                history.goBack();
                toast.error(err.response.data.message, { transition: Flip })
            });

        fetchCommentsBySearch(postId, "")
            .then(res => setComments(res.data))
            .catch(err => {
                history.goBack();
                toast.error(err.response.data.message, { transition: Flip })
            });
    }, [postId]);

    return (
        <motion.section
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Navbar />
            <PageBody>
                <div className="flex flex-col flex-1 items-center px-2 py-2 pb-20 md:px-4 md:pt-4
            xl:pt-2 xl:px-8 overflow-x-hidden scrollbar">
                    {post && (
                        <FullPostCard
                            id={post._id}
                            title={post.title}
                            body={post.body}
                            votes={post.votes}
                            downVotes={post.downVotes}
                        />
                    )}
                </div>
            </PageBody>
        </motion.section>
    );
}

export default PostDetails;