import { motion, Variants } from 'framer-motion'

const LandingPageBody = ({ variants }: { variants: Variants }) => {
  return (
    <motion.div
      className='bg-base-200'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={variants}>
        <div className='bg-base-200 py-10 px-8 sm:px-12 lg:px-28 '>
          <hr className='block w-48 h-1 border-0 bg-accent rounded-md mb-8' />
          <h2 className='flex flex-wrap text-xl font-semibold mb-8 lg:text-3xl lg:font-bold xl:text-5xl'>
            Explore all the
            <span className='text-accent'> &nbsp;breeds</span>
          </h2>
          <p className='mb-8 lg:text-md xl:text-2xl'>
            Explore a huge selection of breeds from the most playful, energetic,
            and intelligent breeds of dogs and cats. We incorporated a
            specialized API to provide you with interesting and accurate details
            about all of kinds of breeds. Immerse yourself through our extensive
            catalog and find your favorite new breed!
          </p>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='card bg-base-100 rounded-2xl'>
              <div className='card-body'>
                <h3 className='text-md card-title'>Stunning Images</h3>
                <p className=''>
                  Explore our immense collection of the most captivating dogs
                  and cats --from the silliest dogs to most elegant purebred
                  cats. Each image selected from our API showcases the beauty of
                  owning one of these adorable creatures.
                </p>
              </div>
            </div>
            <div className='card bg-base-100 rounded-2xl'>
              <div className='card-body'>
                <h3 className='text-md card-title'>Breeds Insights</h3>
                <p className=''>
                  Discover all the different cat and dog breeds each with
                  accurate insights from our API. Learn all about your favorite
                  breeds from common personality traits to where they originated
                  from.
                </p>
              </div>
            </div>
            <div className='card bg-base-100 rounded-2xl'>
              <div className='card-body'>
                <h3 className='text-md card-title'>Explore all pets</h3>
                <p className=''>
                  Browse our immense pet catalog filled with extensive knowledge
                  of all types of cats and dogs. Our API will provide you with
                  detailed insights, images, and knowledge for every type of dog
                  and cat. Whether you are adopting or curious, you'll find all
                  you need here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LandingPageBody
