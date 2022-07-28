import { atom } from 'recoil';

export const categoriesState = atom({
  key: 'categories', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const Mega = atom({
  key: 'Mega',
  default: false
});
