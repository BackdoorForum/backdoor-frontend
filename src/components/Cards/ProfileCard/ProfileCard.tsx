import CardTitle from "../CardTitle";
import CardBody from "../CardBody";
import { KeyIcon, HeartIcon } from '@heroicons/react/solid';

interface Props {
    username?: string;
    bio?: string;
    score?: number;
}

const ProfileCard: React.FC<Props> = props => {

    return (
        <div
            className="flex flex-col justify-around w-11/12 md:w-10/12 xl:w-9/12 2xl:w-8/12
            rounded-2xl bg-grey-lighter my-8"
        >
            {/* Username and bio */}
            <div className="px-8 pt-8 md:px-12 md:pt-12 xl:px-12 xl:pt-8">
                <CardTitle>
                    {props.username}
                </CardTitle>

                <hr className="mb-4 border-red-lighter" />

                <CardBody>
                    {props.bio}
                </CardBody>
            </div>

            {/* Score and like profile */}
            <div className="max-h-min flex justify-between items-center mt-4 px-8 py-4 md:px-12 md:py-6 
                xl:px-12 xl:py-4 bg-grey rounded-b-2xl">

                <div className="flex justify-start items-center text-grey-light text-red-lighter">
                    <KeyIcon className="w-8" />
                    <p className="mx-4 hidden md:block">Backdoor Keys :</p>
                    <p className="mx-2 font-black text-xl"> {props.score} </p>
                </div>
                <div className="flex justify-start items-center text-grey-light text-red-lighter">
                    <p className="mx-4 hidden md:block">Badges :</p>
                    <HeartIcon className="w-8" />
                </div>

            </div>
        </div >
    );
}

export default ProfileCard;