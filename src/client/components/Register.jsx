import { API_ENDPOINT, FORM_NAME, PLACEHOLDER } from '../config';

export const Register = (props) => {
    const { register, handleChange, handleSubmit } = props;

    const { username, password } = register;

    return (
        <>
            <h2>Register</h2>
            <form
                onSubmit={(event) => handleSubmit(event, API_ENDPOINT.REGISTER, register)}
            >
                <input
                    type="text"
                    name="username"
                    placeholder={PLACEHOLDER.USERNAME}
                    value={username}
                    onChange={(event) => handleChange(event, FORM_NAME.REGISTER)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder={PLACEHOLDER.PASSWORD}
                    value={password}
                    onChange={(event) => handleChange(event, FORM_NAME.REGISTER)}
                />
                <button type="submit">Create User</button>
            </form>
        </>
    );
};
