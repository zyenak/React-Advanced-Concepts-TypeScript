import React, { useRef, useState, useEffect } from 'react';
import { Button, Box, TextField } from '@mui/material';
import CustomCarousel, { CarouselHandle } from '../components/carousel';
import { useErrorBoundary } from 'react-error-boundary';

const CarouselContainer: React.FC = () => {
    const carouselRef = useRef<CarouselHandle>(null);
    const slides = ['Slide 1', 'Slide 2', 'Slide 3'];
    const [explode, setExplode] = useState(false);
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        const handleExplode = () => {
            try {
                console.log("throwing error")
                setExplode(false);
                throw new Error('💥 KABOOM 💥');
            } catch (error) {
                console.log("showing boundary")
                showBoundary(error);
            }
        };

        if (explode) {
            console.log("if explode? ")
            handleExplode();
        }
    }, [explode]);

    const handleGoToSlide = () => {
        console.log("slide val: ", document.getElementById('slide-index') as HTMLInputElement);
        const index = parseInt((document.getElementById('slide-index') as HTMLInputElement).value, 10);
        if (carouselRef.current) {
            carouselRef.current.goToSlide(index);
        }
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <h1>Carousel useRef Assigment</h1>
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
                <Button variant="contained" onClick={() => setExplode(true)}>Show Error</Button>
            </Box>
        </Box>
    );
};

export default CarouselContainer;
