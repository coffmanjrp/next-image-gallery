import { atom } from 'recoil';

export const fileDataState = atom({
  key: 'fileDataState',
  default: null,
});

export const docsDataState = atom({
  key: ' docsDataState',
  default: null,
});

export const uploadedState = atom({
  key: 'uploadedState',
  default: false,
});

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

export const progressState = atom({
  key: 'progressState',
  default: 0,
});
