import { apiBaseUrl } from '../constants'
import axios from 'axios'

const checkSession = async (token: string) => {
  const response = await axios.get(apiBaseUrl + `/sessions/${token}`)
  return response.data
}

export default { checkSession }
