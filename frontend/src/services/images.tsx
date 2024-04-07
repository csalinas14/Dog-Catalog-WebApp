import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { BaseQuery, Image } from '../../types'

const getImages = async (object: BaseQuery) => {
  const { data } = await axios.get<Image[]>(
    `${apiBaseUrl}/dogapi/images?animal=${object.animal}&limit=${object.limit}&page=${object.page}`
  )
  return data
}

const getImageById = async (animal: string, id: string) => {
  const { data } = await axios.get<Image>(
    `${apiBaseUrl}/dogapi/images/${id}?animal=${animal}`
  )
  return data
}

export default {
  getImages,
  getImageById,
}
