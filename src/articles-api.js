import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com'
const KEY = 'CfGc7-GnkOpXzLpUnpAM6SpJGPgI7KIxPlz_TqYPzwM'

export const fetchImages = async (searchQuery, currPage) => {
    const response = await axios.get('/search/photos', {
        params: {
            client_id: KEY,
            query: searchQuery,
            page: currPage,
            per_page: 12,
        }
    });
    return response.data.results;
};
