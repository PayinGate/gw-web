import { useState } from 'react';
import API from '../api/handler';


const useAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const api = new API();

    const handleRequest = async (requestFn, ...args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await requestFn(...args);
            // if (response && response.error) {
            //     setError(response.error.data);
            //     throw new Error(response.error.data.message);
            // }
            return response;
        } catch (error) {
            setError("Error sending request. Try again later.");
            //throw error;
        } finally {
            setLoading(false);
        }
    };

    const get = async (url, params, _usesToken=true) => {
        return handleRequest(api.get, url, params, { usesToken: _usesToken });
    };

    const post = async (url, data, usesToken=true,  usesFormData = true, hasImage=false ) => {
        return handleRequest(api.post, url, data, usesToken, {usingFormData: usesFormData, hasImage: hasImage});
    };

    const patch = async (url, data) => {
        return handleRequest(api.patch, url, data);
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
        patch,
        del,
    };
};

export default useAPI;
