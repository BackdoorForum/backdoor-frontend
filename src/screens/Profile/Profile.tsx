import PageBody from '../../components/Utilities/PageBody';
import Navbar from '../../components/Navbars/Navbar';
import PostCard from '../../components/Cards/PostCard/PostCard';
import ProfileCard from '../../components/Cards/ProfileCard/ProfileCard';
import { getUser, fetchPostsBySearch, fetchCommentsBySearch } from '../../api/index';
import { IPost, IUser, IComment } from '../../api/modelsInterface';
import { toast, Flip } from 'react-toastify';
import { motion } from 'framer-motion';
import { routeVariants } from '../../variants/index';
import Sidebar from '../../components/Utilities/Sidebar';
import ChatIllustration from '../../assets/chat-illustration.svg';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const Profile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [userInfo, setUserInfo] = useState<IUser>();
    const [userPosts, setUserPosts] = useState<Array<IPost>>();
    const [userComments, setUserComments] = useState<Array<IComment>>();

    useEffect(() => {
        getUser(username)
            .then(fetchedUser => {
                // get user's posts
                fetchPostsBySearch('', '', fetchedUser.data._id)
                    .then(fetchedPost => setUserPosts( fetchedPost.data ))
                    .catch(err => toast.error(err.response.data.message, { transition: Flip }));
                // get user's comments
                fetchCommentsBySearch('', fetchedUser.data._id)
                    .then(fetchedComments => setUserComments(fetchedComments.data))
                    .catch(err => toast.error(err.response.data.message, { transition: Flip }));
                // set user info
                setUserInfo(fetchedUser.data);
            })
            .catch(err => toast.error(err.response.data.message, { transition: Flip }));
    }, [username]);

    return (
        <motion.section
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Navbar />
            <PageBody>
                {/* Sidebar */}
                <Sidebar
                    bgColor="grey-lighter"
                    title={`${userInfo?.username}`}
                    description={`${userInfo?.bio}`}
                    titleColor="yellow"
                    descriptionColor="white"
                    illustration={ChatIllustration}
                />

                {/* Content Column */}
                <div className="flex flex-1 justify-center flex-wrap pt-8 pb-20 mx-2 box-border">

                    <ProfileCard 
                        username={userInfo?.username}
                        bio={userInfo?.bio}
                        score={userInfo?.score}
                    />

                    {userPosts?.map(post => {
                        const postBody = (post.body.length > 250)
                            ? post.body.substring(0, 250) + "..."
                            : post.body;
                        return (
                            <PostCard
                                id={post._id}
                                title={post.title}
                                body={postBody}
                                votes={post.votes}
                                downVotes={post.downVotes}
                                key={post._id}
                            />
                        )
                    })}
                </div>
            </PageBody>
        </motion.section>
    );
};

export default Profile;
