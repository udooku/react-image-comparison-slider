import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { ImageSlider, ImageSliderProps } from '@udooku/react'

export default {
  title: 'Image Comparison Slider',
  component: ImageSlider,
} as Meta

export const ImageSliderComponent: StoryObj<ImageSliderProps> = {
  args: {
    image1:
      'https://images.pexels.com/photos/17821539/pexels-photo-17821539/free-photo-of-predios-edificios-ponto-de-referencia-ponto-historico.jpeg',
    image2:
      'https://images.pexels.com/photos/17821539/pexels-photo-17821539/free-photo-of-predios-edificios-ponto-de-referencia-ponto-historico.jpeg',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '427px',
          width: '640px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}
