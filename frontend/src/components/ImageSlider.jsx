import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ slides }) => {
    return (
        <Carousel infiniteLoop>
            {slides.slice(5).map((slide) => {
                return <Image src={slide.image} maxH="72" maxW={"72"} />;
            })}
        </Carousel>
    );
};

export default ImageSlider;
