import { NonSensitiveUser } from '../../types'
import { apiBaseUrl } from '../constants'
import axios from 'axios'

const signUp = async (props: {
  username: string
  password: string
  name: string
}) => {
  const response = await axios.post<NonSensitiveUser>(
    apiBaseUrl + '/users',
    props
  )
  //console.log(data)
  return response.data
}

export default { signUp }
