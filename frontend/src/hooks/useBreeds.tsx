import { useEffect, useState } from 'react'
import { Breed } from '../../types'
import breedService from '../services/breeds'
import { getErrorMessage } from '../utils/functions'

export const useBreeds = ({
  animal,
  page,
}: {
  animal: string
  page: string
}) => {
  const [breedInfo, setBreedInfo] = useState<Breed[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchBreedsInfo = async () => {
      setIsLoading(true)
      const petObject = {
        animal: animal === 'cat' ? ('cat' as const) : ('dog' as const),
        page: page,
        limit: '1',
      }
      try {
        const breeds = await breedService.getBreeds(petObject)
        setBreedInfo(breeds)
      } catch (error) {
        setError(getErrorMessage(error))
      }
    }
    fetchBreedsInfo()
  }, [animal, page])

  return { breedInfo, isLoading, error }
}
