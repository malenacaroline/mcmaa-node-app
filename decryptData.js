import axios from 'axios';

const decryptData = async (data) => {
    const response = await axios.post(process.env.API_PALPATINE_URL, { data });
    return response.data;
}

module.exports = decryptData;