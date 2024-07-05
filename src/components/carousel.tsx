import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface CarouselProps {
    slides: string[];
}

export interface CarouselHandle {
    next: () => void;
    prev: () => void;
    goToSlide: (index: number) => void;
    changeSlideColor: () => void;
}

const CustomCarousel = forwardRef<CarouselHandle, CarouselProps>(({ slides }, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideColors, setSlideColors] = useState<string[]>(Array(slides.length).fill('#A0C6FC'));

    useImperativeHandle(ref, () => ({
        next() {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        },
        prev() {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        },
        goToSlide(index: number) {
            if (index >= 0 && index < slides.length) {
                setCurrentSlide(index);
            } else {
                setCurrentSlide(0);
            }
        },
        changeSlideColor() {
            setSlideColors((prevColors) => {
                const newColors = [...prevColors];
                newColors[currentSlide] = newColors[currentSlide] === '#A0C6FC' ? '#CECECE' : '#A0C6FC';
                return newColors;
            });
        },
    }));

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Carousel index={currentSlide} autoPlay={false} indicators={false}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 300,
                            height: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: slideColors[index],
                            margin: '0 auto',
                            marginBottom: 2,
                        }}
                    >
                        {slide}
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
});

export default CustomCarousel;
