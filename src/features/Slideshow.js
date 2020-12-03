import React from "react";
import image_1 from "./assets/shutterstock_507875800.jpg";
import image_2 from "./assets/shutterstock_1088698850.jpg";
import image_3 from "./assets/shutterstock_1350370946.jpg";
import image_4 from "./assets/shutterstock_1569379846.jpg";

export default function SlideShow(props) {
  let photos = [image_1, image_2, image_3, image_4];

  return (
    <div
      className="slideshow-div"
      style={{
        backgroundImage: `url(${
          photos[props.currentImage === 0 ? 3 : props.currentImage - 1]
        })`,
      }}
    >
      <img
        src={photos[props.currentImage]}
        style={{ opacity: `${props.alpha}` }}
        className="slide"
      />
    </div>
  );
}
