import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit'
import loginService from '../services/login'
import sessionService from '../services/sessions'
import { UserSession } from '../../types'
import { RootState } from '../utils/store'
import { getErrorMessage } from '../utils/functions'
import { AxiosError } from 'axios'
import { unknown } from 'zod'

interface MyKnownError {
  // ...
  message: string
  status: number
}

interface UserAttributes {
  username: string
  password: string
  rememberMe: boolean
}

type SessionData = {
  active: boolean
}

interface SessionAttributes {
  token: string
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
      if (user.rememberMe)
        localStorage.setItem('user', JSON.stringify(response))
      else sessionStorage.setItem('user', JSON.stringify(response))

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

export const checkSession = createAsyncThunk<
  // Return type of the payload creator
  SessionData,
  // First argument to the payload creator
  SessionAttributes,
  // Types for ThunkAPI
  {
    rejectValue: MyKnownError
  }
>(
  'users/checkSession',
  async (tokenData, thunkApi) => {
    try {
      const response = await sessionService.checkSession(tokenData.token)
      //console.log(data)

      return response as SessionData
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
  loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'start'
  user: UserSession | null
  error: string | undefined | null
}

const initialState: UserState = {
  loading: 'start',
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
    logout: (state) => {
      state.user = null
      sessionStorage.removeItem('user')
      localStorage.removeItem('user')
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
          state.error = action.payload.message
        } else state.error = action.error.message

        state.loading = 'failed'
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(checkSession.fulfilled, (state, { payload }) => {
        if (!payload.active) {
          sessionStorage.removeItem('user')
          localStorage.removeItem('user')
          state.user = null
          state.error = null
          state.loading = 'idle'
        } else {
          const sessionS = sessionStorage.getItem('user')
          const localS = localStorage.getItem('user')

          if (localS !== null) {
            const longerSession = JSON.parse(localS)
            state.user = longerSession
            state.error = null
            state.loading = 'idle'
          } else if (sessionS !== null) {
            const shorterSession = JSON.parse(sessionS)
            state.user = shorterSession
            state.error = null
            state.loading = 'idle'
          }
          /*
          if (sessionS !== null && localS !== null) {
            const storage = localS ? localS : sessionS
            state.user = JSON.parse(storage)
            state.error = null
            state.loading = 'idle'
          }*/
        }
      })
  },
})

export const { resetIdle, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
