import { useEffect, useState } from 'react'
import { Image } from '../../types'
import imageService from '../services/images'
import { getErrorMessage } from '../utils/functions'

export const useImages = ({
  animal,
  page,
  limitNumber,
}: {
  animal: string
  page: string
  limitNumber: number
}) => {
  const [imageInfo, setImageInfo] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  //number of breeds returned
  const limit = limitNumber.toString()

  useEffect(() => {
    const fetchBreedsInfo = async () => {
      setIsLoading(true)
      const petObject = {
        animal: animal === 'cat' ? ('cat' as const) : ('dog' as const),
        page: page,
        limit: limit,
      }
      try {
        const images = await imageService.getImages(petObject)
        setImageInfo(images)
        setIsLoading(false)
      } catch (error) {
        setError(getErrorMessage(error))
        setIsLoading(false)
      }
    }
    fetchBreedsInfo()
  }, [animal, page, limit])

  return { imageInfo, isLoading, error }
}
