import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    const users = await response.data;
    return users;
};

export default { getAll };
