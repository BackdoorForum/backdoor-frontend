import { Link } from 'react-router-dom';

interface Props {
    loginOnClick?: () => void;
}

const HeroNavbar: React.FC<Props> = props => (
    <div className="flex flex-wrap justify-between items-center pt-8 mb-8 md:mx-40 lg:mx-72 font-display font-bold">
        <ul className="flex items-center">
            <li className="">
                <Link to="/" className="text-xl transition-border duration-300 border-2 border-transparent 
                hover:border-red py-4 px-8 text-lg text-syntax-yellow-darker rounded-full">
                    Home
                </Link>
            </li>
        </ul>
        <ul className="hidden md:flex items-center">
            <li>
                <Link to="/login" className="text-xl transition-border duration-300 border-2 border-transparent 
                hover:border-red py-4 px-7 text-lg text-syntax-yellow-darker rounded-full mx-3">
                    Login
                </Link>
            </li>
            <li>
                <Link to="/signup" className="text-xl transition-border duration-300 border-2 border-transparent 
                bg-grey-lighter hover:border-red py-4 px-8 text-lg text-syntax-yellow-darker rounded-full mx-5">
                    Sign Up
                </Link>
            </li>
        </ul>
    </div>
);

export default HeroNavbar;