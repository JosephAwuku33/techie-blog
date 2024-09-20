import { BlogData, blogPosts } from '../data/blogData';

// Load state from localStorage or use default blogPosts if not available
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('posts');
    if (serializedState === null) {
      return { posts: blogPosts }; // Return default data if localStorage is empty
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return { posts: blogPosts }; // Return default data on error
  }
};

// Save state to localStorage
export const saveState = (state: { posts: BlogData[] }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('posts', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};
