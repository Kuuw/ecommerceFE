import React, { useState } from 'react';
import { ProductImage } from '../../types/ProductImage';

interface ImageCarouselProps {
    images: ProductImage[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    const goToSlide = (index: number) => {
        setCurrent(index);
    };

    if (!Array.isArray(images) || images.length === 0) {
        return null;
    }

    return (
        <div id="indicators-carousel" className="relative w-64 h-64" data-carousel="static">
            {/* Carousel wrapper */}
            <div className="relative h-64 overflow-hidden rounded-lg md:h-64">
                {images.map((image, index) => (
                    <div
                        key={image.productImageId}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
                        data-carousel-item={index === current ? 'active' : undefined}
                    >
                        <img
                            src={image.imagePath}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === current ? 'bg-blue-600' : 'bg-gray-400'}`}
                        aria-current={index === current}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
            {/* Navigation buttons */}
            <button onClick={prevSlide} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg aria-hidden="true" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button onClick={nextSlide} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg aria-hidden="true" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default ImageCarousel;