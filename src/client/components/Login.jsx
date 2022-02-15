export const Login = (props) => {
    const { login, handleChange, handleSubmit } = props;

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={(event) => handleSubmit(event, 'user/login', login)}>
                <input
                    type="text"
                    name="username"
                    placeholder="enter username"
                    value={login.username}
                    onChange={(event) => handleChange(event, 'login')}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="enter password"
                    value={login.password}
                    onChange={(event) => handleChange(event, 'login')}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};
