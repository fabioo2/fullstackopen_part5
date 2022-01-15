import blogService from '../services/blogs';

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data];
        case 'LIKE_BLOG':
            //why can't a declare a variable here stupid es lint
            return state.map((blog) => (blog.id !== action.data.id ? blog : action.data));
        case 'INIT_BLOGS':
            return action.data;
        case 'DELETE_BLOG':
            return state.filter((blog) => blog.id !== action.id);
        default:
            return state;
    }
};

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        });
    };
};

export const createBlog = (data) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(data);
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        });
        //pretty cool u can make it return the blog object
        return newBlog;
    };
};

export const likeBlog = (id, blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.update(id, blog);

        dispatch({
            type: 'LIKE_BLOG',
            data: newBlog,
        });

        return newBlog;
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.deleteBlog(id);
        dispatch({
            type: 'DELETE_BLOG',
            // data: blogToDelete, this doesn't work because the api call doesn't return anything
            id,
        });
    };
};
export default reducer;
