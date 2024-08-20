import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com'
const KEY: string = 'CfGc7-GnkOpXzLpUnpAM6SpJGPgI7KIxPlz_TqYPzwM'


export const fetchImages = async <T>(searchQuery: string, currPage: number): Promise<T> => {
    try {
        const response = await axios.get('/search/photos', {
            params: {
                client_id: KEY,
                query: searchQuery,
                page: currPage,
                per_page: 12,
            }
        });
        const respResult: T = response.data.results;
        return respResult;
    } catch (error) {
        throw new Error("ERROR");

    }

};
