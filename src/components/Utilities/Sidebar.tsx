import { motion } from 'framer-motion';
import { sidebarVariants } from '../../variants/index';
import Illustration from '../Utilities/Illustration';

import '../../scss/sidebar.scss';

interface Props {
    logo?: boolean;
    title?: string;
    description?: string
    illustration: string;
    titleColor?: string
    descriptionColor?: string
    bgColor: string;
}

const Sidebar: React.FC<Props> = props => {
    const bgMap = new Map();
    bgMap.set('yellow', 'sideBgYellow');
    bgMap.set('grey-lighter', 'sideBgGreyLighter');

    const titleMap = new Map();
    titleMap.set('yellow', 'sideTitleYellow');

    const borderMap = new Map();
    borderMap.set('yellow', 'sideBorderYellow');

    const descMap = new Map();
    descMap.set('yellow', 'sideDescYellow');
    descMap.set('grey-darker', 'sideDescGreyDarker');
    descMap.set('grey-light', 'sideDescGreyLight');

    return (
        <motion.div className={`sticky top-0 left-0 self-start min-h-screen hidden xl:block xl:w-3/12
        px-5 ${bgMap.has(props.bgColor) ? bgMap.get(props.bgColor) : 'sideBgDefault'} flex flex-col items-start`}
            variants={sidebarVariants} initial="hidden"
            animate="visible"
        >
            {props.logo &&
                <h2 className="font-logo text-xl text-red text-left pt-28 mx-2 my-4">Devit</h2>
            }

            {props.title && (
                <>
                    <h2 className={`font-display font-medium text-6xl `+
                        `${titleMap.has(props.titleColor) ? titleMap.get(props.titleColor) : 'sideTitleDefault'} `+
                        `text-left pt-20 mx-2 my-4`}>
                        {props.title}
                    </h2>
                    <hr className={`border-2 ${borderMap.get('yellow')} rounded-2xl`} />
                </>
            )}

            <p className={`font-body text-2xl tracking-wider `+
                `${descMap.has(props.descriptionColor) ? descMap.get(props.descriptionColor) : 'sideDescDefault'} `+
                `text-left mx-2 mt-4 xl:mb-20 2xl:mb-32`}>
                {props.description}
            </p>
            <Illustration src={props.illustration} />
        </motion.div>
    )
};

export default Sidebar;