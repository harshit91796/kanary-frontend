import axios from 'axios';

const api='http://localhost:3007'

const getHeaders = () => {
  const token = sessionStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const getRequest = async (endpoint, params) => {
  try {
    const response = await axios.get(`${api}${endpoint}`, {
      params,
      headers: getHeaders()
    });
    return response;
  } catch (error) {
    console.error('Error in getRequest:', error);
    throw error;
  }
};

const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(`${api}${endpoint}`, {
      headers: getHeaders()
    });
    return response;
  } catch (error) {
    console.error('Error in deleteRequest:', error);
    throw error;
  }
}

const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${api}${endpoint}`, data, {
      headers: getHeaders()
    });
    return response;
  } catch (error) {
    console.error('Error in postRequest:', error);
    throw error;
  }
};

export const getLogs = async (data) => {
    try {
        const response = await getRequest(`/api/logs`, data);
        return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
        throw error;
    }
}

export const login = async (data) => {
  try {
    const response = await postRequest('/api/users/login', data);
    // if (response.data && response.data.token) {
    //   sessionStorage.setItem('token', response.data.token);
    // }
    console.log("response", response);
    return response.data;
    // console.log("response", response);
    // return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: 'Invalid credentials. Please try again.' };
    }
    return { error: 'An error occurred. Please try again.' };
  }
}

export const logout = async () => {
  try {
    
    const response = await postRequest('/api/users/logout');

    return response;
  } catch (error) {
    console.error('Error in logout:', error);
    throw error;
  }
}

export const deleteLogs = async(id)=>{
  try {
    const response = await deleteRequest(`/api/logs/${id}`);
    return response;
  } catch (error) {
    console.error('Error in deleteLogs:', error);
    throw error;
  }
}

export const signup=(data)=>{
    return postRequest('/api/users/signup', data)
}
