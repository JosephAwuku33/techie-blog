import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogData, blogPosts } from '../data/blogData';

interface PostsState {
  posts: BlogData[];
}

const initialState: PostsState = {
  posts: blogPosts, // Default data
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<BlogData>) => {
      state.posts.push(action.payload);
    },
    // Updating a post using the UUID
    updatePost: (state, action: PayloadAction<{ id: string; post: BlogData }>) => {
      const { id, post } = action.payload;
      const index = state.posts.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.posts[index] = post;
      }
    },

    // Deleting a post using the UUID
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
