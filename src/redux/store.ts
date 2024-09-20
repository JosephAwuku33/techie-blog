import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState: {
    posts: persistedState || [],
  },
});

// Save the state to localStorage whenever the state changes
store.subscribe(() => {
  saveState({
    posts: store.getState().posts.posts, // Ensure the type is BlogData[]
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
