export const Register = (props) => {
    const {registerForm, handleChange, handleSubmit} = props

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={event => handleSubmit(event, 'user/register', 'POST', registerForm)}>
                <input type="text" name="username" placeholder="enter username" value={registerForm.username} onChange={event => handleChange(event, 'register')} />
                <input type="password" name="password" placeholder="enter password" value={registerForm.password} onChange={event => handleChange(event, 'register')} />
                <button type="submit">Create User</button>
            </form>
        </>
    );
};
