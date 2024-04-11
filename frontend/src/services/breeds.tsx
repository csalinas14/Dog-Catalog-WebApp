import { BaseQuery, Breed, BreedResponse } from '../../types'
import { apiBaseUrl } from '../constants'
import axios from 'axios'

const getBreeds = async (object: BaseQuery) => {
  const { data } = await axios.get<BreedResponse>(
    `${apiBaseUrl}/dogapi/breeds?animal=${object.animal}&limit=${object.limit}&page=${object.page}`
  )
  return data
}

const getBreedInfo = async (object: BaseQuery) => {
  const { data } = await axios.get<Breed>(
    `${apiBaseUrl}/dogapi/breeds/${object.breed_id}?animal=${object.animal}`
  )

  return data
}

export default {
  getBreeds,
  getBreedInfo,
}
