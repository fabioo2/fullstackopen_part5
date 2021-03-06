import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    const blogs = await response.data;
    return blogs;
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
    try {
        const config = {
            headers: { Authorization: token },
        };
        const request = axios.delete(`${baseUrl}/${id}`, config);
        return request.then((response) => response.status);
    } catch (error) {
        console.error('this errored');
    }
};
export default { getAll, create, setToken, update, deleteBlog };
