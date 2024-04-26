import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../reducers/usersReducer'
import favoritesReducer from '../reducers/favoritesReducer'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    favorites: favoritesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
