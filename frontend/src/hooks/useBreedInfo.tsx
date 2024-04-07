import { useEffect, useState } from 'react'
import { Breed, Image } from '../../types'
import breedService from '../services/breeds'
import { getErrorMessage } from '../utils/functions'
import { apiBreedRequestLimit } from '../constants'
import imageService from '../services/images'

export const useBreedInfo = ({
  breed_id,
  animal,
}: {
  breed_id: string | undefined
  animal: string
}) => {
  const [breedInfo, setBreedInfo] = useState<Breed>()
  const [breedImage, setBreedImage] = useState<Image>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  //number of breeds returned
  const limit = apiBreedRequestLimit.toString()

  useEffect(() => {
    const fetchBreedsInfo = async () => {
      setIsLoading(true)
      const petObject = {
        animal: animal === 'cat' ? ('cat' as const) : ('dog' as const),
        page: '',
        limit: '',
        breed_id: breed_id,
      }
      try {
        const breeds = await breedService.getBreedInfo(petObject)
        //we can trust the id to be correct if it exist
        //if it doesn't then we we will have a null image object which we can place alternate text in
        if (breeds.reference_image_id) {
          const breedImage = await imageService.getImageById(
            breeds.type,
            breeds.reference_image_id
          )
          setBreedImage(breedImage)
        }
        setBreedInfo(breeds)
        setIsLoading(false)
      } catch (error) {
        setError(getErrorMessage(error))
        setIsLoading(false)
      }
    }
    fetchBreedsInfo()
  }, [animal, breed_id])

  return { breedInfo, breedImage, isLoading, error }
}
