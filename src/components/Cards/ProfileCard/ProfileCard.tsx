import { KeyIcon, HeartIcon, BanIcon, TrendingUpIcon, CubeIcon, ChatIcon, DocumentReportIcon, GlobeIcon, SunIcon, ViewGridAddIcon } from '@heroicons/react/solid';

interface Props {
    username?: string;
    bio?: string;
    score?: number;
    permissionLevel?: number;
    numberOfPosts?: number;
    numberOfComments?: number;
    joinedAt?: string;
}

const ProfileCard: React.FC<Props> = props => {
    const joinedAt = new Date(props.joinedAt || "").toUTCString().slice(0, -13);

    return (
        <div
            className="flex flex-col justify-around w-11/12 md:w-10/12 xl:w-9/12 2xl:w-8/12
            rounded-2xl backdrop-filter backdrop-blur-md bg-transparent my-8 border-2 border-syntax-purple"
        >
            {/* Username and bio */}
            <div className="px-8 pt-8 md:px-12 md:pt-12 xl:px-12 xl:pt-8">
                <h2 className="flex justify-between text-display tracking-wider font-display text-2xl md:text-3xl 2xl:text-5xl text-syntax-purple my-2">
                    <div className="flex">
                        {props.username}
                        {props.permissionLevel && props.permissionLevel === 2 ? <GlobeIcon className="w-8 mx-4"/> : null}
                        {props.permissionLevel && props.permissionLevel === 3 ? <ViewGridAddIcon className="w-8 mx-4"/> : null}
                        {props.permissionLevel && props.permissionLevel === 4 ? <SunIcon className="w-8 mx-4"/> : null}
                    </div>
                    <p className="text-lg md:text-lg 2xl:text-xl text-white my-2">
                        ({joinedAt})
                    </p>
                </h2>

                <hr className="mb-4 border-syntax-purple" />

                <p className="font-body text-lg md:text-xl 2xl:text-2xl text-white my-1 overflow-ellipsis">
                    {(props.bio && props.bio?.length > 150) ? props.bio?.substring(0, 150)+'...' : props.bio}
                </p>
            </div>

            {/* Score and like profile */}
            <div className="max-h-min flex justify-between items-center mt-4 px-8 py-4 md:px-12 md:py-6 
                xl:px-12 xl:py-4 text-xl">
                <div className="flex justify-start items-center text-grey-light text-red-lighter">
                    <KeyIcon className="w-8" />
                    <p className="mx-4 hidden md:block">Backdoor Keys :</p>
                    <p className="mx-2 font-black"> {props.score} </p>
                </div>
                <div className="flex justify-start items-center text-grey-light text-red-lighter">
                    <p className="mx-4 hidden md:block">Badges :</p>
                    { props.score && props?.score > 40 ? <HeartIcon className="w-8" /> : null }
                    { props.score && props?.score > 40 ? <TrendingUpIcon className="w-8" /> : null }
                    { props.score && props?.score > 40 ? <CubeIcon className="w-8" /> : null }
                    <BanIcon className="w-8" />
                </div>
            </div>
            
            <div className="max-h-min flex justify-between items-center mt-4 px-8 py-4 md:px-12 md:py-6 
                xl:px-12 xl:py-4 text-xl">
                <div className="flex justify-start items-center text-grey-light text-red-lighter">
                    <DocumentReportIcon className="w-8" />
                    <p className="mx-4 hidden md:block">Total Posts :</p>
                    <p className="mx-2 font-black"> {props.numberOfPosts} </p>
                </div>
                <div className="flex justify-start items-center text-grey-light text-red-lighter">
                    <ChatIcon className="w-8" />
                    <p className="mx-4 hidden md:block">Total Comments :</p>
                    <p className="mx-2 font-black"> {props.numberOfComments} </p>
                </div>
            </div>
        </div >
    );
}

export default ProfileCard;