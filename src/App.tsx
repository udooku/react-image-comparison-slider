import img1 from './assets/image1.jpg'
import img2 from './assets/image2.jpg'

import { ImageSlider } from './components/ImageSlider'

export function App() {
  console.log(img1)
  return (
    <div
      style={{
        height: '427px',
        width: '600px',
      }}
    >
      <ImageSlider
        sliderColor="#000"
        handleColor="#123"
        image1={img1}
        image2={img2}
      />
    </div>
  )
}
