import axios from "axios";
import { api } from '../config'

axios.defaults.baseURL = api.API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        const responseData = error.response.data;
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    break;
                default:
                    break;
            }
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;
        switch (error.status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 401:
                console.log("API helper 401");
                message = "Invalid credentials";
                break;
            case 404:
                message = "Sorry! the data you are looking for could not be found";
                break;
            default:
                message = responseData.msg;
        }
        return Promise.reject(message);
    }
);


class APIClient {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response;

        let paramKeys = [];
        if (params) {
            Object.keys(params).map((key) => {
                paramKeys.push(key + "=" + params[key]);
                return paramKeys;
            });

            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join("&") : "";
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    };
    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data);
    };
    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.patch(url, data);
    };

    put = (url, data) => {
        return axios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url, config) => {
        return axios.delete(url, { ...config });
    };
}


export { APIClient };