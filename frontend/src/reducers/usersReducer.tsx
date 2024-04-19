import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit'
import loginService from '../services/login'
import { UserSession } from '../../types'
import { RootState } from '../utils/store'
import { getErrorMessage } from '../utils/functions'
import { AxiosError } from 'axios'
import { unknown } from 'zod'

interface MyKnownError {
  response: {
    data: string
  }
  // ...
}

interface UserAttributes {
  username: string
  password: string
  rememberMe: boolean
}

export const updateUser = createAsyncThunk<
  // Return type of the payload creator
  UserSession,
  // First argument to the payload creator
  UserAttributes,
  // Types for ThunkAPI
  {
    rejectValue: MyKnownError
  }
>(
  'users/update',
  async (user, thunkApi) => {
    try {
      const response = await loginService.login(user)
      //console.log(data)
      return response as UserSession
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

interface UserState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  user: UserSession | null
  error: string | undefined | null | MyKnownError
}

const initialState: UserState = {
  loading: 'idle',
  user: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetIdle: (state) => {
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload
        state.loading = 'succeeded'
      })
      .addCase(updateUser.rejected, (state, action) => {
        //const msg = getErrorMessage(action.payload)

        if (action.payload) {
          //const stringify_payload = JSON.stringify(action.payload)
          //console.log(action.payload?.response.data)
          console.log(action.payload)
          state.error = action.payload
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
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending'
      })
  },
})

export const { resetIdle } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
