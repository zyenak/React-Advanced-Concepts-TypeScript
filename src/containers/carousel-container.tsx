import React, { useRef } from 'react';
import { Button, Box, TextField } from '@mui/material';
import CustomCarousel, { CarouselHandle } from '../components/carousel';
import { useErrorBoundary } from 'react-error-boundary';

const CarouselContainer: React.FC = () => {
    const carouselRef = useRef<CarouselHandle>(null);
    const slides = ['Slide 1', 'Slide 2', 'Slide 3'];
    const { showBoundary } = useErrorBoundary();

    const handleGoToSlide = () => {
        const index = parseInt((document.getElementById('slide-index') as HTMLInputElement).value, 10);
        if (carouselRef.current) {
            carouselRef.current.goToSlide(index);
        }
    };

    const handleExplode = () => {
        try {
            throw new Error('💥 KABOOM 💥');
        } catch (error) {
            showBoundary(error);
        }
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <h1>Carousel useRef Assignment</h1>
            <CustomCarousel ref={carouselRef} slides={slides} />
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" onClick={() => carouselRef.current?.prev()}>Previous</Button>
                    <Button variant="contained" onClick={() => carouselRef.current?.next()}>Next</Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField id="slide-index" label="Slide Index" type="number" variant="outlined" size="small" />
                    <Button variant="contained" onClick={handleGoToSlide}>Jump to Slide</Button>
                </Box>
                <Button variant="contained" onClick={() => carouselRef.current?.changeSlideColor()}>Change Color</Button>
                <Button variant="contained" onClick={handleExplode}>Show Error</Button>
            </Box>
        </Box>
    );
};

export default CarouselContainer;
