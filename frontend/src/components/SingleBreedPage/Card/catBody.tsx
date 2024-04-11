import { Breed } from '../../../../types'

const CatBodyBreedInfo = ({ breed }: { breed: Breed }) => {
  const test = (breed: Breed) => {
    if ('type' in breed && breed.type === 'cat') {
      return breed
    } else {
      throw new Error('Not the right animal type')
    }
  }
  const breedNarrowed = test(breed)
  return (
    <div className='card-body bg-base-300 p-4 col-span-2 lg:col-span-3'>
      <p className=''>{breedNarrowed.description}</p>
      <div className='flex flex-col'>
        <p className='text-neutral-500'>
          Weight: {breedNarrowed.weight.imperial} lbs
        </p>
        <p className='text-neutral-500'>
          Life Span: {breedNarrowed.life_span} years
        </p>
        <p className='text-neutral-500'>Origin: {breedNarrowed.origin}</p>
      </div>
      <p className='font-extralight pl-1 text-sm'>* Stats range from 0 to 5</p>
      <div className='stats shadow grid grid-cols-2 grid-flow-row overflow-hidden lg:grid-cols-3'>
        <div className='stat flex flex-col pl-2 md:pl-6'>
          <div className='stat-title'>Affection</div>
          <div className='flex flex-row justify-around'>
            <div className='stat-value text-primary'>
              {breedNarrowed.affection_level}
            </div>
            <div className='stat-figure text-primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className='stat flex flex-col pl-2 md:pl-6'>
          <div className='stat-title'>Energy</div>
          <div className='flex flex-row justify-around'>
            <div className='stat-value text-secondary'>
              {breedNarrowed.energy_level}
            </div>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className='stat flex flex-col pl-2 md:pl-6'>
          <div className='stat-title'>Human Friendly</div>
          <div className='flex flex-row justify-around'>
            <div className='stat-value text-accent'>
              {breedNarrowed.stranger_friendly}
            </div>
            <div className='stat-figure text-accent overflow-hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='stat flex flex-col pl-2 md:pl-6'>
          <div className='stat-title'>Intelligence</div>
          <div className='flex flex-row justify-around'>
            <div className='stat-value text-secondary'>
              {breedNarrowed.intelligence}
            </div>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='stat flex flex-col pl-2 md:pl-6'>
          <div className='stat-title'>Shedding</div>
          <div className='flex flex-row justify-around'>
            <div className='stat-value text-accent'>
              {breedNarrowed.shedding_level}
            </div>
            <div className='stat-figure text-accent'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='stat flex flex-col pl-2 md:pl-6'>
          <div className='stat-title'>Vocal</div>
          <div className='flex flex-row justify-around'>
            <div className='stat-value text-primary'>
              {breedNarrowed.vocalisation}
            </div>
            <div className='stat-figure text-primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatBodyBreedInfo
