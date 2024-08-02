import { useState } from 'react';
import API from '../api/handler';


const useAPI = (baseURL) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const api = new API(baseURL);

    const handleRequest = async (requestFn, ...args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await requestFn(...args);
            if (response.error) {
                setError(response.error.data);
                throw new Error(response.error.data.message);
            }
            return response;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setTimeout(()=>{
                setLoading(false);
            }, 1000);
        }
    };

    const get = async (url, params) => {
        return handleRequest(api.get, url, params);
    };

    const post = async (url, data) => {
        return handleRequest(api.post, url, data);
    };

    const put = async (url, data) => {
        return handleRequest(api.put, url, data);
    };

    const del = async (url) => {
        return handleRequest(api.delete, url);
    };

    return {
        loading,
        error,
        get,
        post,
        put,
        del,
    };
};

export default useAPI;
