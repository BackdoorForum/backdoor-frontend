import { motion } from 'framer-motion';
import { modalVariants } from '../../variants/index';

const ModalContainer: React.FC = props => (

    <motion.div className="flex flex-col justify-center items-center bg-grey-lighter rounded-2xl
                w-10/12 sm:w-3/5 md:w-2/5 2xl:w-4/12 m-4 py-4 sm:py-6 xl:py-10 xl:px-8"
        onClick={e => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        {props.children}
    </motion.div>
);

export default ModalContainer;