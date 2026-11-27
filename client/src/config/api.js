// Demo API client. Kept for legacy services; all calls are answered locally.
import { demoFetch } from "../store/api/demoRouter";

const toBody = (data) => {
  if (data === undefined || data === null) return undefined;
  if (typeof FormData !== "undefined" && data instanceof FormData) return data;
  return JSON.stringify(data);
};

const request = async (method, url, data, config = {}) => {
  const isForm = typeof FormData !== "undefined" && data instanceof FormData;
  const response = await demoFetch(url, {
    method,
    body: toBody(data),
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(config.headers || {}),
    },
  });
  const envelope = await response.json();

  if (!response.ok) {
    const error = new Error(envelope?.message || "Demo request failed.");
    error.response = { status: response.status, data: envelope };
    throw error;
  }

  return { ...response, data: envelope };
};

class DemoApiClient {
  get(url, config) {
    return request("GET", url, undefined, config);
  }

  post(url, data = {}, config) {
    return request("POST", url, data, config);
  }

  put(url, data = {}, config) {
    return request("PUT", url, data, config);
  }

  patch(url, data = {}, config) {
    return request("PATCH", url, data, config);
  }

  delete(url, config) {
    return request("DELETE", url, undefined, config);
  }

  uploadFile(url, formData, onProgress) {
    onProgress?.(100);
    return request("POST", url, formData);
  }

  isAuthenticated() {
    return Boolean(localStorage.getItem("token"));
  }

  getAuthToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("persist");
  }
}

export default new DemoApiClient();
