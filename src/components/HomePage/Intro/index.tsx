import Carousel from '@components/Carousel'
import React from 'react'
import styles from './styles.module.scss'

export const Intro = () => {
  return (
    <section className={`${styles['intro-container']}`}>
      <div className={`${styles['intro-carousel']}`}>
        <Carousel />
      </div>
      <div>AAA</div>
    </section>
  )
}
