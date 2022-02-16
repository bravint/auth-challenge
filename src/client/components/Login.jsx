import { API_ENDPOINT, FORM_NAME, PLACEHOLDER } from '../config';

export const Login = (props) => {
    const { login, handleChange, handleSubmit } = props;

    const { username, password } = login;

    return (
        <>
            <h2>Login</h2>
            <form
                onSubmit={(event) => handleSubmit(event, API_ENDPOINT.LOGIN, login)}
            >
                <input
                    type="text"
                    name="username"
                    placeholder={PLACEHOLDER.USERNAME}
                    value={username}
                    onChange={(event) => handleChange(event, FORM_NAME.LOGIN)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder={PLACEHOLDER.PASSWORD}
                    value={password}
                    onChange={(event) => handleChange(event, FORM_NAME.LOGIN)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};
