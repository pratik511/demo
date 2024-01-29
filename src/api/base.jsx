import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

export const defaultHeaders = {
  contentType: "application/json",
};

export const axiosInstance = axiosApi;
export async function get(url, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .get(url, { params: config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function patch(url, data, config = {}) {
  return await axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((error) => error.response);
}
export async function post(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .post(url, { ...data }, { ...config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function postFormData(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .post(url, data, {
        ...config,
        headers: authHeader({
          ...defaultHeaders,
          contentType: "multipart/form-data",
        }),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function put(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .put(url, { ...data }, { ...config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function putFormData(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .put(url, data, {
        ...config,
        headers: authHeader({
          ...defaultHeaders,
          contentType: "multipart/form-data",
        }),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function del(url, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .delete(url, { ...config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const thunkHandler = async (asyncFn, thunkAPI) => {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const authHeader = (header = defaultHeaders) => {
  let headers = {
    "Content-Security-Policy": "default-src 'self',frame-src 'self'",
    "ngrok-skip-browser-warning": true,
  };
  if (header.contentType) {
    headers["Content-Type"] = header.contentType;
  }
  return headers;
};
