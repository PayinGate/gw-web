import axios from 'axios';

class API {
  constructor(baseURL) {
    this.baseURL = 'http://localhost:3000';
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

  async get(url, params = null) {
    try {
      const queryParams = new URLSearchParams(params);
      const response = await axios.get(`${this.baseURL}${url}${queryParams ? `?${queryParams.toString()}` : ''}`, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NGM5MWYxYy05YWU5LTQ1YWEtOTgyNS1jMTY4MDBmNzg4MWYiLCJpYXQiOjE3MzUwNTU4NzN9.tbwuORMO15JHrD1i4UYYruQOz8GmVKoUswSUIM9IIwc` }
      } );
      return response.data;
    } catch (error) {
      if(error.response) {
        return { error: error.response };
      }
      throw new Error(`GET request to ${url} failed: ${error.message}`);
    }
  }

  async post(url, data = {}) {
    try {
      const response = await axios.post(`${this.baseURL}${url}`, data, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NGM5MWYxYy05YWU5LTQ1YWEtOTgyNS1jMTY4MDBmNzg4MWYiLCJpYXQiOjE3MzUwNTU4NzN9.tbwuORMO15JHrD1i4UYYruQOz8GmVKoUswSUIM9IIwc` }
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
