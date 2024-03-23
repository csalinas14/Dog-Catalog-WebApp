import { BaseQuery, BreedResponse } from '../../types'
import { apiBaseUrl } from '../constants'
import axios from 'axios'

const getBreeds = async (object: BaseQuery) => {
  const { data } = await axios.get<BreedResponse>(
    `${apiBaseUrl}/dogapi/breeds?animal=${object.animal}&limit=${object.limit}&page=${object.page}`
  )
  return data
}

export default {
  getBreeds,
}
