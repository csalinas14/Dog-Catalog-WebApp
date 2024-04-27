import { FavoriteType } from '../../../../types'

const FavoritesList = ({ favorites }: { favorites: FavoriteType[] | null }) => {
  console.log('Favorites on User Page')
  console.log(favorites)
  if (!favorites) {
    return <div>No favorites</div>
  }
  return (
    <div className='my-8'>
      <h2 className='text-3xl font-semibold py-4'>Favorites</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {favorites.map((fav) => (
          <figure
            className='aspect-square rounded-lg h-full w-full shadow-xl'
            key={fav.image_id}
          >
            <img
              src={fav.image.url}
              className='h-full w-full object-center rounded-lg'
            />
          </figure>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList
