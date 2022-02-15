export const Register = (props) => {
    const {register, handleChange, handleSubmit} = props

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={event => handleSubmit(event, 'user/register', register)}>
                <input type="text" name="username" placeholder="enter username" value={register.username} onChange={event => handleChange(event, 'register')} />
                <input type="password" name="password" placeholder="enter password" value={register.password} onChange={event => handleChange(event, 'register')} />
                <button type="submit">Create User</button>
            </form>
        </>
    );
};
