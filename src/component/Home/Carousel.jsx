import React from "react";
import Coffee1 from "../../assets/ImgCarousal/Coffee 1.jpg";
import Coffee2 from "../../assets/ImgCarousal/Coffee 2.webp";
import Coffee3 from "../../assets/ImgCarousal/Coffee 3.jpg";
import Coffee4 from "../../assets/ImgCarousal/Coffee 3.webp";
import Coffee5 from "../../assets/ImgCarousal/Coffee 4.jpg";
import Coffee6 from "../../assets/ImgCarousal/Coffee 4.webp";
import Coffee7 from "../../assets/ImgCarousal/Coffee 5.webp";
import Coffee8 from "../../assets/ImgCarousal/Coffee 6.webp";
import Coffee9 from "../../assets/ImgCarousal/Coffee 7.webp";
import Coffee10 from "../../assets/ImgCarousal/Coffee 8.webp";
import Coffee11 from "../../assets/ImgCarousal/Coffee.jpg";
import Coffee12 from "../../assets/ImgCarousal/Coffee.png";
import Coffee13 from "../../assets/ImgCarousal/Coffee.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const images = [
    Coffee1,
    Coffee2,
    Coffee3,
    Coffee4,
    Coffee5,
    Coffee6,
    Coffee7,
    Coffee8,
    Coffee9,
    Coffee10,
    Coffee11,
    Coffee12,
    Coffee13,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };

  return (
    <React.Fragment>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-72 overflow-hidden rounded-lg h-[600px]"
          >
            <img
              src={image}
              alt={`Coffee ${index + 1}`}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[100%]"
            />
          </div>
        ))}
      </Slider>
    </React.Fragment>
  );
};

export default Carousel;
