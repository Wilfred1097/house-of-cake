import Cookies from 'js-cookie';

export const TOKEN_NAME = 'crm_token';
const TOKEN_EXPIRY = 1; // days

export const generateToken = () => {
  // In production, this should be handled by the backend
  return btoa(Date.now() + '-' + Math.random());
};

export const setAuthToken = (token) => {
  Cookies.set(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_NAME);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_NAME);
};

export const isAuthenticated = () => {
  return !!Cookies.get(TOKEN_NAME);
}; 