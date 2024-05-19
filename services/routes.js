const API_BASE_URL = 'http://192.168.161.33:9000/api/';

const fetchApi = async (url, options = {}) => {
    const response = await fetch(API_BASE_URL + url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        },
    });

    const contentType = response.headers.get('Content-Type') || '';

    if (!response.ok) {
        if (contentType.includes('application/json')) {
            const errorBody = await response.json();
            throw { status: response.status, body: errorBody };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (contentType.includes('application/json')) {
        return response.json();
    }
    return response;
};


export const login = async (email, password) => {
    const data = { email, password };
    const response = await fetchApi('auth/login', { method: 'POST', body: JSON.stringify(data) });
    return response;
};

export const register = async (userData) => {
    const response = await fetchApi('auth/register', { method: 'POST', body: JSON.stringify(userData) });
    return response;
};

export const getAuthUser = async (token) => {
    const response = await fetchApi('auth/user', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const getGasCategories = async () => {
    const response = await fetchApi('gas-categories');
    return response;
};

export const createGasCategory = async (data, token) => {
    const response = await fetchApi('gas-categories', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const updateGasCategory = async (id, data, token) => {
    const response = await fetchApi(`gas-categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const deleteGasCategory = async (id, token) => {
    const response = await fetchApi(`gas-categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const getGasPosts = async () => {
    const response = await fetchApi('gas-posts');
    return response;
};

export const createGasPost = async (data, token) => {
    const response = await fetchApi('gas-posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const updateGasPost = async (id, data, token) => {
    const response = await fetchApi(`gas-posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const deleteGasPost = async (id, token) => {
    const response = await fetchApi(`gas-posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const getOrders = async () => {
    const response = await fetchApi('orders');
    return response;
};

export const createOrder = async (data, token) => {
    const response = await fetchApi('orders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const updateOrder = async (id, data, token) => {
    const response = await fetchApi(`orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};

export const deleteOrder = async (id, token) => {
    const response = await fetchApi(`orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
};