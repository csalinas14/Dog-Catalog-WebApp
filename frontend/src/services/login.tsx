import { apiBaseUrl } from '../constants'
import axios from 'axios'

const login = async (props: {
  username: string
  password: string
  rememberMe: boolean
}) => {
  const response = await axios.post(apiBaseUrl + '/login', props)
  //console.log(data)
  return response.data
}

export default { login }
