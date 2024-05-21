const API_BASE_URL = "https://gas.socialsmarttech.com/api/";

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

// Auth routes
export const register = async (userData) => {
    return await fetchApi('auth/register', { method: 'POST', body: JSON.stringify(userData) });
};

export const login = async (email, password) => {
    const data = { email, password };
    return await fetchApi('auth/login', { method: 'POST', body: JSON.stringify(data) });
};

export const getAuthUser = async (token) => {
    return await fetchApi('auth/user', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateProfile = async (userData, token) => {
    return await fetchApi('auth/update-profile', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const logout = async (token) => {
    return await fetchApi('auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Gas Category routes
export const addGasCategory = async (formData, token) => {
    return await fetchApi('gas-category/add', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getGasCategories = async (token) => {
    return await fetchApi('gas-category/get', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getSingleGasCategory = async (categoryId, token) => {
    return await fetchApi(`gas-category/get/${categoryId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Gas Post routes
export const addGasPost = async (formData, token) => {
    return await fetchApi('gas-post/add', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getGasPosts = async (token) => {
    return await fetchApi('gas-post/get', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getSingleGasPost = async (postId, token) => {
    return await fetchApi(`gas-post/get/${postId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getSupplierGasPosts = async (supplierId, token) => {
    return await fetchApi(`gas-post/supplier/${supplierId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const publishGasPost = async (postId, token) => {
    return await fetchApi(`gas-post/publish/${postId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const unpublishGasPost = async (postId, token) => {
    return await fetchApi(`gas-post/unpublish/${postId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Order routes
export const createOrder = async (orderData, token) => {
    return await fetchApi('order/create', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getClientOrders = async (clientId, token) => {
    return await fetchApi(`order/get-client-orders/${clientId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getSupplierOrders = async (supplierId, token) => {
    return await fetchApi(`order/get-supplier-orders/${supplierId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getSingleOrder = async (orderId, token) => {
    return await fetchApi(`order/get/${orderId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateOrder = async (orderId, orderData, token) => {
    return await fetchApi(`order/update/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(orderData),
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteOrder = async (orderId, token) => {
    return await fetchApi(`order/delete/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
};

