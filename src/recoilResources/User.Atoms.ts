import { atom } from 'recoil';

export const categoriesState = atom({
  key: 'categories', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const questionsState = atom({
  key: 'questions', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const difficultyState = atom({
  key: 'difficulty',
  default: ""
});

export const ScoreState = atom({
  key: 'score',
  default: 0
});

export const usernameState = atom({
  key: 'username',
  default: ""
});
