import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit'
import favoriteService from '../services/favorites'
import { FavoriteType } from '../../types'
import { RootState } from '../utils/store'
import { getErrorMessage } from '../utils/functions'
import { AxiosError } from 'axios'

interface MyKnownError {
  // ...
  message: string
  status: number
}

interface FavoriteAttributes {
  token: string
  animal: string
}

interface NewFavoriteAttributes {
  animal: string
  image_id: string
  url: string
  sub_id: string
  token: string
}

export type NewFavoriteResponse = {
  message: string
  id: number
}

export const getFavorites = createAsyncThunk<
  // Return type of the payload creator
  FavoriteType[],
  // First argument to the payload creator
  FavoriteAttributes,
  // Types for ThunkAPI
  {
    rejectValue: MyKnownError
  }
>(
  'favorites/update',
  async (favoriteAttr, thunkApi) => {
    try {
      const response = await favoriteService.getFavoritesByUser(
        favoriteAttr.animal,
        favoriteAttr.token
      )
      //console.log(data)

      return response as FavoriteType[]
    } catch (err) {
      const error = err as AxiosError<MyKnownError>
      //console.log(response)
      //if (response.status === 400) {
      // Return the known error for future handling
      //console.log(response)
      if (!error.response) {
        throw err
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
  //return (await response) as UserSession
)

export const addFavorite = createAsyncThunk<
  // Return type of the payload creator
  NewFavoriteResponse,
  // First argument to the payload creator
  NewFavoriteAttributes,
  // Types for ThunkAPI
  {
    rejectValue: MyKnownError
  }
>(
  'favorites/add',
  async (favoriteAttr, thunkApi) => {
    try {
      const response = await favoriteService.addFavorite(
        favoriteAttr.animal,
        favoriteAttr.image_id,
        favoriteAttr.token
      )
      //console.log(data)

      return response as NewFavoriteResponse
    } catch (err) {
      const error = err as AxiosError<MyKnownError>
      //console.log(response)
      //if (response.status === 400) {
      // Return the known error for future handling
      //console.log(response)
      if (!error.response) {
        throw err
      }
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
  //return (await response) as UserSession
)

interface FavoriteState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'start'
  favorites: FavoriteType[] | []
  error: string | undefined | null
}

const initialState: FavoriteState = {
  loading: 'start',
  favorites: [],
  error: null,
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    resetIdle: (state) => {
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.fulfilled, (state, { payload }) => {
        state.favorites = payload
        state.loading = 'succeeded'
      })
      .addCase(getFavorites.rejected, (state, action) => {
        //const msg = getErrorMessage(action.payload)

        if (action.payload) {
          //const stringify_payload = JSON.stringify(action.payload)
          //console.log(action.payload?.response.data)
          console.log(action.payload)
          state.error = action.payload.message
        } else state.error = action.error.message
        /*
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
        */
        state.loading = 'failed'
      })
      .addCase(getFavorites.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (action.payload.message === 'SUCCESS') {
          const newFav: FavoriteType = {
            id: action.payload.id,
            image_id: action.meta.arg.image_id,
            sub_id: action.meta.arg.sub_id,
            image: {
              id: action.meta.arg.image_id,
              url: action.meta.arg.url,
            },
          }

          state.favorites = [...state.favorites, newFav]
          state.loading = 'succeeded'
          state.error = null
        }
      })
  },
})

export const { resetIdle } = favoriteSlice.actions

export const selectFavorites = (state: RootState) => state.favorites

export default favoriteSlice.reducer
