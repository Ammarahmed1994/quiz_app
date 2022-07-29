import { atom } from 'recoil';

export const SearchKeyBar = atom({
  key: 'inputValueSearchKey', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
});
export const IdCategSearchKeyBar = atom({
  key: 'inputServiceCategId', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
});
export const IdAreaSearch = atom({
  key: 'inputServiceAreaId', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
});
export const ServicesSearchMainFunc = atom({
  key: 'ServicesSearchMainFunc', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
});
