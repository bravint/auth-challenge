import { Link } from 'react-router-dom';

export const Home = (props) => {
    const { isLoggedIn } = props;
    return (
        <>
            <h2>Hi</h2>
            <ul>
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <li>
                        <Link to="/movies">Movies</Link>
                    </li>
                )}
            </ul>
        </>
    );
};
