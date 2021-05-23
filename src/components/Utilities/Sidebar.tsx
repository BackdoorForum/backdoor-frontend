import { motion } from 'framer-motion';
import { sidebarVariants } from '../../variants/index';
import TextFeild from './TextField';
import Illustration from '../Utilities/Illustration';
import { ChangeEventHandler } from 'react';

interface Props {
    logo?: boolean;
    title?: string;
    description?: string
    illustration: string;
    titleColor?: string
    descriptionColor?: string
    bgColor: string;
    showSearch?: boolean;
    searchTitle?: string;
    searchPlaceholder?: string;
    handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const Sidebar: React.FC<Props> = props => (
    <motion.div className={`sticky top-0 left-0 self-start min-h-screen hidden xl:block xl:w-3/12 px-5 bg-${props.bgColor} flex flex-col items-start`}
        variants={sidebarVariants} initial="hidden"
        animate="visible"
    >
        {props.logo &&
            <h2 className="font-logo text-xl text-red text-left pt-28 mx-2 my-4">Backdoor</h2>
        }

        {props.title && (
            <>
                <h2 className={`font-display font-medium text-6xl text-${props.titleColor} text-left pt-28 mx-2 my-4`}>
                    {props.title}
                </h2>
                <hr className={`border-2 border-${props.titleColor} rounded-2xl`} />
            </>
        )}

        <p className={`font-body text-2xl tracking-wider text-${props.descriptionColor} text-left mx-2 mt-4 xl:mb-16 2xl:mb-32`}>
            {props.description}
        </p>

        {props.showSearch && (
            <>
                <p className={`font-body text-2xl tracking-wider text-${props.descriptionColor} text-left mx-2 mt-4`}>
                    {props.searchTitle}
                </p>
                <TextFeild type="text" placeholder={props.searchPlaceholder||""} onChange={props.handleChange} />
            </>
        )}

        <Illustration src={props.illustration} />
    </motion.div>
);

export default Sidebar;