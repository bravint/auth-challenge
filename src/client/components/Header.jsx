import { Link } from 'react-router-dom';

import '../styles/header.css';

export const Header = (props) => {
    const { isLoggedIn, HandleLogout } = props;

    return (
        <header>
            <ul className="links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/movies">Movies</Link>
                        </li>
                        <li>
                            <a href="#" onClick={HandleLogout}>
                                Logout
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};
