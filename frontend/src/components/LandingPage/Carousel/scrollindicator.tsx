import { useState, useEffect } from 'react'
import {
  apiHeroCatImagesRequestLimit,
  apiHeroDogImagesRequestLimit,
} from '../../../constants'

const Dot = ({
  active,
  setCurIndex,
  setPrevIndex,
  index,
  curIndex,
}: {
  active: boolean
  setCurIndex: React.Dispatch<React.SetStateAction<number>>
  setPrevIndex: React.Dispatch<React.SetStateAction<number>>
  index: number
  curIndex: number
}) => {
  //determines if dot is filled
  const bgColor = active ? 'bg-neutral' : 'bg-neutral-content'

  //event to update indexes when clicking on dots
  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setPrevIndex(curIndex)
    setCurIndex(index)
  }

  return (
    <button
      className={`rounded-full ${bgColor} border border-neutral btn-sm btn-circle lg:btn-md`}
      onClick={handleClick}
    >
      <svg
        id='patternId'
        width='100%'
        height='100%'
        xmlns='http://www.w3.org/2000/svg'
      ></svg>
    </button>
  )
}

const ScrollIndicator = ({
  target,
  photoRef,
}: {
  target: React.RefObject<HTMLDivElement>
  photoRef: React.MutableRefObject<HTMLDivElement | null>
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [prevIndex, setPrevIndex] = useState<number>(0)

  const element = target.current
  const photoElement = photoRef.current
  const count = apiHeroCatImagesRequestLimit + apiHeroDogImagesRequestLimit
  //console.log(photoElement?.offsetWidth)
  //console.log(offsets)
  const offsets: number[] = []

  if (element?.children.length) {
    for (let i = 0; i < element?.children.length; i++) {
      const temp = element.children[i] as HTMLDivElement
      offsets.push(temp.offsetLeft)
    }
    console.log(offsets)
  }

  //event listener for mousewheel or touchpad
  useEffect(() => {
    target.current?.addEventListener('mousewheel', scrollListener)
    target.current?.addEventListener('touchmove', scrollListener)
    return () => {
      element && element.removeEventListener('mousewheel', scrollListener)
      element && element.removeEventListener('touchmove', scrollListener)
    }
  })

  //how we update carousel position when clicking dots
  useEffect(() => {
    if (element !== null && photoElement !== null) {
      //some math using photo width with previous and current index to swap photos in carousel when clicking buttons

      if (currentIndex === 0) {
        element.scrollLeft = 0
      } else if (currentIndex === count - 1) {
        element.scrollLeft = element.scrollWidth
      } else {
        const midpoint = offsets[currentIndex] + photoElement.offsetWidth / 2

        element.scrollLeft = midpoint - element.clientWidth / 2
      }

      setScrollProgress((currentIndex * 100) / count + 0.01)
    }
  }, [element, photoElement, currentIndex, count, prevIndex])

  //how dots are rendered
  const renderDots = () => {
    //used to know if our dot should be active when scrolling through
    const selectedDotValue = (scrollProgress * count) / 100

    return [...Array(count).keys()].map((index) => (
      <Dot
        key={index}
        active={selectedDotValue >= index && selectedDotValue <= index + 1}
        setCurIndex={setCurrentIndex}
        setPrevIndex={setPrevIndex}
        index={index}
        curIndex={currentIndex}
      />
    ))
  }

  //event function that updates where we are when scrolling through carousel
  const scrollListener: EventListener = () => {
    if (!target.current) {
      return
    }

    const element = target.current
    const windowScroll = element.scrollLeft // Distance of the scrollbar from the leftmost point
    const totalWidth = element.scrollWidth - element.clientWidth // Total width the scrollbar can traverse

    if (windowScroll === 0) {
      return setScrollProgress(0)
    }

    if (windowScroll > totalWidth) {
      return setScrollProgress(100)
    }

    setScrollProgress((windowScroll / totalWidth) * 100)
  }
  console.log(target.current?.scrollLeft)
  return (
    <div className='flex flex-row justify-center gap-1 py-4 lg:py-8'>
      {renderDots()}
    </div>
  )
}

export default ScrollIndicator
