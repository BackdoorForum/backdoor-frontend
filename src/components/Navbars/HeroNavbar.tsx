import LoginModal from '../LoginModal/LoginModal';
import { IStore } from '../../store/authInterface';
import { logout } from '../../api/index';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deauthenticate } from '../../store/authSlice';
import { toast, Flip } from 'react-toastify';

const HeroNavbar: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: IStore) => state.auth.isAuthenticated)

    const backdropClickHandler = () => {
        console.log("clicledsdafjkashfgkuhasdkjg");
        setShowLoginModal(false);
    }
    const loginClickHandler = () => setShowLoginModal(true);
    const signupClickHandler = () => history.push("/signup");

    const logoutClickHandler = () => {
        logout()
            .then(res => {
                dispatch(deauthenticate());
                toast.success(res.data.message, { transition: Flip });
                history.push('/');
            })
            .catch(err => {
                toast.error(err.response.data.message, { transition: Flip });
            });
    }

    const rightNavLinks = isAuthenticated
        ? (
            <>
                <li>
                    <button className="text-xl transition-border duration-300 border-2 border-transparent 
                        hover:border-red py-4 px-7 text-lg text-syntax-yellow-darker rounded-full mx-3"
                        onClick={logoutClickHandler}
                    >
                        Logout
                    </button>
                </li>
            </>
        )
        :  (
            <>
                <li>
                    <button className="text-xl transition-border duration-300 border-2 border-transparent 
                        hover:border-red py-4 px-7 text-lg text-syntax-yellow-darker rounded-full mx-3"
                        onClick={loginClickHandler}
                    >
                        Login
                    </button>
                </li>
                <li>
                    <button className="text-xl transition-border duration-300 border-2 border-transparent 
                        bg-grey-lighter hover:border-red py-4 px-8 text-lg text-syntax-yellow-darker rounded-full mx-5"
                        onClick={signupClickHandler}
                    >
                        Sign Up
                    </button>
                </li>
            </>
        );

    return (
        <>
            <LoginModal show={showLoginModal} backdropClicked={backdropClickHandler} />
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
                    {rightNavLinks}
                </ul>
            </div>
        </>
    )
};

export default HeroNavbar;