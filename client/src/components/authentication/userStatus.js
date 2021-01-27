import Cookies from 'js-cookie';

export function saveUser(token, user) {
  Cookies.set('jwtToken', token);
  localStorage.setItem('user', user);
}

export function removeUser(setLoginStatus) {
  Cookies.remove('jwtToken');
  localStorage.removeItem('user');
}

export const isLoggedIn = localStorage.getItem('user') !== null;
