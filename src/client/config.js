export const API_URL = 'http://localhost:4000';

export const TOKEN = 'token';

export class API_ENDPOINT {
    static LOGIN = '/user/login';
    static REGISTER = '/user/register';
    static MOVIE = '/movie';
}

export class FORM_NAME {
    static LOGIN = 'Login';
    static REGISTER = 'Register';
}

export class INPUT_NAME {
    static USERNAME = 'username';
    static PASSWORD = 'password';
    static TITLE = 'title'
    static DESC = 'description'
    static RUNTIME = 'runtimeMins'
}

export class INPUT_TYPE {
    static TEXT = 'text';
    static PASSWORD = 'password';
    static SUBMIT = 'submit'
}

export class PLACEHOLDER {
    static USERNAME = 'Enter Username';
    static PASSWORD = 'Enter Password';
    static TITLE = 'Enter Title';
    static DESC = 'Enter Description';
    static RUNTIME = 'Enter Runtime (mins)';
}

export class URL {
    static HOME = '/';
    static LOGIN = '/login';
    static MOVIES = '/movies';
    static NOT_FOUND = '*'
    static REGISTER = '/register';
    static NULL = '#'   
}