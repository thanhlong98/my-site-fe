import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const images = [
  '/carousel-1.jpg',
  '/carousel-2.jpg',
  '/carousel-3.jpg',
  '/carousel-4.jpg',
  '/carousel-5.jpg',
]

const Carousel = () => {
  const [current, setCurrent] = useState(0)

  const nextSlice = () =>
    setCurrent(current === images.length - 1 ? 0 : current + 1)

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlice()
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [current])

  return (
    <div className="carousel">
      {images.map((item, index) => (
        <div
          key={index.toString()}
          className={`carousel__item ${current === index ? 'active' : ''}`}
        >
          <Image
            src={item}
            alt="carousel-1"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={40}
          />
        </div>
      ))}
    </div>
  )
}

export default Carousel
