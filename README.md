<div align="center">
<h1>Udooku: React Image Comparison Slider</h1>

<a href="https://github.com/udooku/react-image-comparison-slider/blob/main/LICENSE">
<img src="https://img.shields.io/github/license/udooku/react-image-comparison-slider" alt="License MIT" />
</a>
</div>
<br /><br /><br /><br />
This project was branched of: <a href="https://github.com/OnurErtugral/react-image-comparison-slider">OnurErtugral</a>

## Installation

```
npm i @udooku/react-image-comparison-slider
```

or

```
yarn add @udooku/react-image-comparison-slider
```

## Usage

```
import ImageSlider from "@udooku/react-image-comparison-slider";

<div style={{ width: 700, height: 450 }}>
    <ImageSlider
        image1=""
        image2=""
        onSlide={() => {
          console.log("sliding");
        }}
    />
</div>
```

## Props

| Props                 |    Type     |  Default  | Description                                               |
| --------------------- | :---------: | :-------: | --------------------------------------------------------- |
| image1                |   string    |     -     | First image's source (URL, base64 string etc.)            |
| image2                |   string    |     -     | Second image's source (URL, base64 string etc.)           |
| alt1                  |   string    | `"alt1"`  | First image's alt text                                    |
| alt2                  |   string    | `"alt2"`  | Second image's alt text                                   |
| sliderColor           |   string    |  `"red"`  | Slider's color. Should be valid CSS color expression.     |
| sliderWidth           |   number    |     3     | Slider's width in pixel.                                  |
| showHandle            |   boolean   |   true    | If false, hides slider handle.                            |
| handleBackgroundColor |   string    | `"white"` | Background color of the slider's handle.                  |
| handleColor           |   string    |  `"red"`  | Background color of the triangles on the slider's handle. |
| customHandle          | DOM Element |   null    | Renders the passed DOM element as a slider handle.        |
| sliderInitialPosition |   number    |    0.5    | Slider's initial position between 0 and 1.                |
| leftLabelText         |   string    |   null    | A label for the first image.                              |
| rightLabelText        |   string    |   null    | A label for the second image.                             |
| showPlaceholder       |   boolean   |   true    | Placeholder is shown while waiting for full image to load |
| customPlaceholder     | DOM Element |   null    | Pass your custom placeholder component/element.           |

## Callbacks

| Props              |   Type   | Default | Description                                                            |
| ------------------ | :------: | :-----: | ---------------------------------------------------------------------- |
| onSlide            | function |    -    | A callback function which is invoked on slider's position change.      |
| onSlideEnd         | function |    -    | A callback function which is invoked on mouseUp at the end of sliding. |
| onLoadFirstImage   | function |    -    | Is invoked when the first image has finished loading.                  |
| onLoadSecondImage  | function |    -    | Is invoked when the second image has finished loading.                 |
| onErrorFirstImage  | function |    -    | Is invoked when an error occurs loading the first image.               |
| onErrorSecondImage | function |    -    | Is invoked when an error occurs loading the second image.              |

## Animation

| Props                  |  Type   | Default | Description                           |
| ---------------------- | :-----: | :-----: | ------------------------------------- |
| animate                | boolean |  false  | Animates slider.                      |
| animationCycleDuration | number  |  5000   | Duration of animation in miliseconds. |
