import loginService from '../services/login';
import blogService from '../services/blogs';

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_USER':
            return action.login;
        case 'SET_USER':
            return action.login;
        default:
            return state;
    }
};

export const getUser = (username, password) => {
    return async (dispatch) => {
        const credentials = {
            username,
            password,
        };
        console.log(credentials);
        const login = await loginService.login(credentials);
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(login));
        blogService.setToken(login.token);

        dispatch({
            type: 'GET_USER',
            login,
        });
    };
};

export const setUser = (login) => {
    return {
        type: 'SET_USER',
        login,
    };
};

export default reducer;
