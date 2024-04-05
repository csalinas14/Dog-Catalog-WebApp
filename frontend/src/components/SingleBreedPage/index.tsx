import { useMatch } from 'react-router-dom'

const BreedPage = () => {
  const breedMatch = useMatch('/breeds/:id')
  console.log(breedMatch)

  return <div>Hello</div>
}

export default BreedPage
