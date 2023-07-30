const fetch = require('node-fetch');
const HOST = 'http://127.0.0.1:5555';

class ApiTestRequester {
  #token = null;

  get(path) {
    try {
      return this.#callApi(HOST + path, 'GET');
    } catch (error) {
      throw error;
    }
  }

  post(path, data) {
    try {
      return this.#callApi(HOST + path, 'POST', data);
    } catch (error) {
      throw error;
    }
  }

  put(path, data) {
    try {
      return this.#callApi(HOST + path, 'PUT', data);
    } catch (error) {
      throw error;
    }
  }

  delete(path) {
    try {
      return this.#callApi(HOST + path, 'DELETE');
    } catch (error) {
      throw error;
    }
  }

  async #callApi(path, method, body) {  
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.#token
      }
    }

    if (body) options.body = JSON.stringify(body);

    try {
      const res = await fetch(path, options);
      const data = await res.json()

      if (res.ok === false) {
        throw new Error(data.error);
      }

      return data;

    } catch (error) {
      throw error;
    }
  }

  async adminLogin() {
    try {
      const data = {
        email: 'admin@admin.com',
        password: '1234'
      }
      const resData = await this.post('/api/users/login', data);
      this.#token = resData.token;

    } catch (error) {
      console.log('test admin login error', error);
    }
  }
}

module.exports = new ApiTestRequester();
