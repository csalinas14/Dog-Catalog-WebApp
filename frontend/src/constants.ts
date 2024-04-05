const url = import.meta.env.DEV
  ? 'http://localhost:3001/api'
  : 'https://pet-catalog-backend.onrender.com/api'

export const apiBaseUrl = url

export const apiBreedRequestLimit = 10

export const apiGalleryImagesRequestLimit = 10

export const apiHeroCatImagesRequestLimit = 3

export const apiHeroDogImagesRequestLimit = 4
