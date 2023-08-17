/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react'
import { SliderHandle } from '../SliderHandle'
import { Wrapper } from './styles'

export interface ImageSliderProps {
  image1: string
  image2: string
  alt1?: string
  alt2?: string
  sliderColor?: string
  sliderWidth?: number
  sliderInitialPosition?: number
  onSlide?: () => void
  onSlideEnd?: () => void
  handleBackgroundColor?: string
  handleColor?: string
  showHandle?: boolean
  customHandle?: JSX.Element | null
  leftLabelText?: string | null
  rightLabelText?: string | null
  onLoadFirstImage?: () => void
  onLoadSecondImage?: () => void
  onErrorFirstImage?: () => void
  onErrorSecondImage?: () => void
  showPlaceholder?: boolean
  customPlaceholder?: JSX.Element | null
  animate?: boolean
  animationCycleDuration?: number
}

let animationLoop: number

export function ImageSlider({
  image1,
  image2,
  alt1 = 'alt1',
  alt2 = 'alt2',
  sliderColor = 'red',
  sliderWidth = 3,
  sliderInitialPosition = 0.5,
  onSlide,
  onSlideEnd,
  handleBackgroundColor = 'white',
  handleColor = 'red',
  showHandle = true,
  customHandle = null,
  leftLabelText = null,
  rightLabelText = null,
  onLoadFirstImage,
  onLoadSecondImage,
  onErrorFirstImage,
  onErrorSecondImage,
  showPlaceholder = true,
  customPlaceholder = null,
  animate = false,
  animationCycleDuration = 5000,
}: ImageSliderProps): JSX.Element {
  const [fromLeft, setFromLeft] = useState<number | null>(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false)
  const [secondImageLoaded, setSecondImageLoaded] = useState<boolean>(false)
  const fromLeftRef = useRef<number | null>(null)

  useEffect(() => {
    let step = 1
    let widthClosure = 0

    function animateSlider(): void {
      animationLoop = requestAnimationFrame(animateSlider)

      if (fromLeftRef.current !== null) {
        if (fromLeftRef.current >= widthClosure) {
          step *= -1
        } else if (fromLeftRef.current <= 0) {
          step *= -1
        }

        setFromLeft(fromLeftRef.current + step)

        fromLeftRef.current += step
      }
    }

    if (containerRef && containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerSize({
        width,
        height,
      })
      setFromLeft(width * sliderInitialPosition)

      if (animate) {
        fromLeftRef.current = width * sliderInitialPosition
        step = Math.round((width / animationCycleDuration) * 16.6 * 100) / 100
        widthClosure = width

        animateSlider()
      }
    }
  }, [animate, animationCycleDuration, sliderInitialPosition])

  useEffect(() => {
    function handleMouseUp(): void {
      setIsMouseDown(false)
      onSlideEnd && onSlideEnd()
    }

    function handleMouseMove(e: any): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect()
        onSlide && onSlide()

        if (e.pageX - left < 0) {
          setFromLeft(0 - sliderWidth / 2)
        } else if (e.pageX > left + width) {
          setFromLeft(width - sliderWidth / 2)
        } else {
          setFromLeft(e.pageX - left)
        }
      }
    }

    function handleTouchMove(e: any): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect()

        if (e.touches[0].pageX - left < 0) {
          setFromLeft(0 - sliderWidth / 2)
        } else if (e.touches[0].pageX > left + width) {
          setFromLeft(width - sliderWidth / 2)
        } else {
          setFromLeft(e.touches[0].pageX - left)
        }
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchmove', handleTouchMove)

    return (): void => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isMouseDown, onSlide, onSlideEnd, sliderWidth])

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ): void => {
    e.stopPropagation()
    e.preventDefault()

    cancelAnimationFrame(animationLoop)
    setIsMouseDown(true)
  }

  return (
    <Wrapper
      ref={containerRef}
      style={{
        cursor: isMouseDown ? 'ew-resize' : 'default',
      }}
    >
      {fromLeft !== null && (
        <>
          <div className="slider__container">
            <img
              alt={alt1}
              src={image1}
              width={containerSize.width}
              height={containerSize.height}
              onLoad={(): void => {
                onLoadFirstImage && onLoadFirstImage()
                setFirstImageLoaded(true)
              }}
              onError={(): void => {
                onErrorFirstImage && onErrorFirstImage()
              }}
            />

            {showPlaceholder &&
              !firstImageLoaded &&
              (customPlaceholder ? (
                <div
                  className="custom-placeholder__wrapper"
                  style={{ left: fromLeft }}
                >
                  {customPlaceholder}
                </div>
              ) : (
                <div className="placeholder" />
              ))}

            {rightLabelText && (
              <div className="label__text label__right">{rightLabelText}</div>
            )}
          </div>

          <div
            className="slider__container img-comp-overlay"
            style={{ width: fromLeft <= 0 ? 0 : fromLeft }}
          >
            <img
              alt={alt2}
              src={image2}
              width={containerSize.width}
              height={containerSize.height}
              onLoad={(): void => {
                onLoadSecondImage && onLoadSecondImage()
                setSecondImageLoaded(true)
              }}
              onError={(): void => {
                onErrorSecondImage && onErrorSecondImage()
              }}
            />

            {showPlaceholder &&
              !secondImageLoaded &&
              (customPlaceholder ? (
                <div className="custom-placeholder__wrapper">
                  {customPlaceholder}
                </div>
              ) : (
                <div className="placeholder" />
              ))}

            {leftLabelText && (
              <div className="label__text label__left">{leftLabelText}</div>
            )}
          </div>

          <div
            className="slider__stick"
            style={{
              left: fromLeft,
              backgroundColor: sliderColor,
              width: sliderWidth,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="slider__handle">
              {showHandle
                ? customHandle || (
                    <SliderHandle
                      backgroundColor={handleBackgroundColor}
                      color={handleColor}
                    />
                  )
                : null}
            </div>
          </div>
        </>
      )}
    </Wrapper>
  )
}
