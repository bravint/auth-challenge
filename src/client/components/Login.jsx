export const Login = (props) => {
    const {loginForm, handleChange, handleSubmit} = props

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={event => handleSubmit(event, 'user/login', 'POST', loginForm)}>
                <input type="text" name="username" placeholder="enter username" value={loginForm.username} onChange={event => handleChange(event, 'login')} />
                <input type="password" name="password" placeholder="enter password" value={loginForm.password} onChange={event => handleChange(event, 'login')} />
                <button type="submit">Login</button>
            </form>
        </>
    );
};
