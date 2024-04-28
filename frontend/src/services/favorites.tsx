import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { FavoriteType } from '../../types'
import { NewFavoriteResponse } from '../reducers/favoritesReducer'

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

const addFavorite = async (animal: string, image_id: string, token: string) => {
  const config = {
    headers: { Authorization: 'bearer ' + token },
  }
  const postBody = {
    animal,
    image_id,
  }
  const { data } = await axios.post<NewFavoriteResponse>(
    `${apiBaseUrl}/dogapi/favorites`,
    postBody,
    config
  )

  return data
}

const delFavorite = async (token: string, fav_id: number) => {
  const config = {
    headers: { Authorization: 'bearer ' + token },
  }
  const { data } = await axios.delete(
    `${apiBaseUrl}/dogapi/favorites/${fav_id}`,
    config
  )
  return data
}

export default {
  getFavoritesByUser,
  addFavorite,
  delFavorite,
}
