import axios from 'axios';
import { getCookie } from '../utils/utils';

class API {
  constructor(baseURL) {
    this.baseURL = 'https://2fe99342f6c6.ngrok-free.app';
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

      async _getHeaders(usesToken, { isGetMethod = true, hasImage = false } = {}) {
        const headers = {};
        if (!isGetMethod && !hasImage) {
            headers['Content-Type'] = 'application/json';
        }

        if (usesToken) {
            try {
              console.log(document.cookie)
              const token = getCookie('token');
              headers['Authorization'] = `Bearer ${token}`;

            } catch (error) {
              console.log(error);
                throw new Error("Failed to obtain authentication token.");
            }
        }

        headers["ngrok-skip-browser-warning"] = true;

        return headers;
    }

  async get(url, params = {}, {usesToken = true}) {
    try {
      const response = await axios.get(`${this.baseURL}${url}`, {
        params: params,
        headers: await this._getHeaders(usesToken)
      } );
      return response.data;
    } catch (error) {
      if(error.response) {
        return { error: error.response };
      }
      throw new Error(`GET request to ${url} failed: ${error.message}`);
    }
  }

  async post(url, data = {}, {usesToken = false}) {
    try {
      const response = await axios.post(`${this.baseURL}${url}`, data, {
        headers: await this._getHeaders(usesToken)
      });
      return response.data;
    } catch (error) {
      if(error.response) {
        return { error: error.response };
      }
      throw new Error(`POST request to ${url} failed: ${error.message}`);
    }
  }

  async put(url, data = {}) {
    try {
      const response = await axios.put(`${this.baseURL}${url}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`PUT request to ${url} failed: ${error.message}`);
    }
  }

  async delete(url) {
    try {
      const response = await axios.delete(`${this.baseURL}${url}`);
      return response.data;
    } catch (error) {
      throw new Error(`DELETE request to ${url} failed: ${error.message}`);
    }
  }
}

export default API;
