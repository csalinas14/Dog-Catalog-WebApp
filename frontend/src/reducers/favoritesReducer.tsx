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

interface FavoriteState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'start'
  favorites: FavoriteType[] | null
  error: string | undefined | null
}

const initialState: FavoriteState = {
  loading: 'start',
  favorites: null,
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
  },
})

export const { resetIdle } = favoriteSlice.actions

export const selectFavorites = (state: RootState) => state.favorites

export default favoriteSlice.reducer
