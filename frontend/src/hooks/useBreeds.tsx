import { useEffect, useState } from 'react'
import { Breed } from '../../types'
import breedService from '../services/breeds'
import { getErrorMessage } from '../utils/functions'
import { apiBreedRequestLimit } from '../constants'

export const useBreeds = ({
  animal,
  page,
}: {
  animal: string
  page: string
}) => {
  const [breedInfo, setBreedInfo] = useState<Breed[]>([])
  const [totalBreeds, setTotalBreeds] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  //number of breeds returned
  const limit = apiBreedRequestLimit.toString()

  useEffect(() => {
    const fetchBreedsInfo = async () => {
      setIsLoading(true)
      const petObject = {
        animal: animal === 'cat' ? ('cat' as const) : ('dog' as const),
        page: page,
        limit: limit,
      }
      try {
        const { breeds, totalCount } = await breedService.getBreeds(petObject)
        setBreedInfo(breeds)
        setTotalBreeds(totalCount)
        setIsLoading(false)
      } catch (error) {
        setError(getErrorMessage(error))
        setIsLoading(false)
      }
    }
    fetchBreedsInfo()
  }, [animal, page, limit])

  return { breedInfo, totalBreeds, isLoading, error }
}
