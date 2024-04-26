import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { FavoriteType } from '../../types'

const getFavoritesByUser = async (animal: string, token: string) => {
  const config = {
    headers: { Authorization: 'bearer ' + token },
  }
  const { data } = await axios.get<FavoriteType[]>(
    `${apiBaseUrl}/dogapi/favorites?animal=${animal}`,
    config
  )
  return data
}

export default {
  getFavoritesByUser,
}
