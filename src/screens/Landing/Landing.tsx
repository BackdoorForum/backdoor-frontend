import HeroNavbar from '../../components/Navbars/HeroNavbar';
import Illustration from '../../components/Utilities/Illustration';
import classes from './Landing.module.scss';
import DangerButton from '../../components/Buttons/DangerButton';
import DiscussionIllustration from '../../assets/discussion-illustration.svg';
import { Link } from 'react-router-dom';
import { routeVariants } from '../../variants';
import { motion } from 'framer-motion';

const Landing: React.FC = () => {

    return (
        <motion.section
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className={`mt-0 pt-0 ${classes.HeroHeader}`}>
                <HeroNavbar />

                <section className="flex flex-wrap justify-center h-1/2 md:h-3/4">
                    <div className="flex flex-grow flex-col flex-wrap w-full md:max-w-1/2 justify-center items-center md:items-start text-center md:text-left text-white mx-8 lg:mx-16 xl:mx-20 my-4 text-left">
                        <h1 className="text-4xl md:text-6xl text-red lg:text-8xl font-logo my-4 lg:my-7">Devit</h1>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-display mb-8 md:mb-16">A VIT Bhopal discussion forum.</p>
                        <Link to="/threads">
                            <DangerButton>Get Started</DangerButton>
                        </Link>
                    </div>
                    <Illustration src={DiscussionIllustration} />
                </section>
            </div>
        </motion.section>
    );
}

export default Landing;