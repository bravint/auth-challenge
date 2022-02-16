import { Link, useNavigate } from 'react-router-dom';

import { TOKEN, URL } from '../config';

import '../styles/header.css';

export const Header = (props) => {
    const { isLoggedIn, setIsLoggedIn } = props;

    const navigate = useNavigate();

    const HandleLogout = () => {
        localStorage.removeItem(TOKEN);

        setIsLoggedIn(false);

        navigate(URL.HOME);
    };

    return (
        <header>
            <ul className='links'>
                <li>
                    <Link to={URL.HOME}>Home</Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to={URL.REGISTER}>Register</Link>
                        </li>
                        <li>
                            <Link to={URL.LOGIN}>Login</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to={URL.MOVIES}>Movies</Link>
                        </li>
                        <li>
                            <a href={URL.NULL} onClick={HandleLogout}>
                                Logout
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};
