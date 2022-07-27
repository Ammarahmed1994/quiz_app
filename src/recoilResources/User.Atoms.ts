import { atom } from 'recoil';

export const authTokenState = atom({
  key: 'authToken', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('authToken') || '' // default value (aka initial value)
});
export const LoggedInState = atom({
  key: 'Login', // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});

export const Mega = atom({
  key: 'Mega',
  default: false
});
