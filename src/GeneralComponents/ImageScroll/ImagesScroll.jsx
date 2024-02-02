import { useEffect, useRef, useState } from "react";
import './style.css';


const ImageCarousel = ({ images, className }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState();
    const carouselItemsRef = useRef([]);

    useEffect(() => {
        if (images && images[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(
                0,
                images.length
            );

            setSelectedImageIndex(0);
            setSelectedImage(images[0]);
        }
    }, [images]);

    const handleSelectedImageChange = (newIdx) => {
        if (images && images.length > 0) {
            setSelectedImage(images[newIdx]);
            setSelectedImageIndex(newIdx);
            if (carouselItemsRef?.current[newIdx]) {
                // carouselItemsRef?.current[newIdx]?.scrollIntoView({
                //     inline: "center",
                //     behavior: "smooth"
                // });
            }
        }
    };

    const handleRightClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex + 1;
            if (newIdx >= images.length) {
                newIdx = 0;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    const handleLeftClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex - 1;
            if (newIdx < 0) {
                newIdx = images.length - 1;
            }
            handleSelectedImageChange(newIdx);
        }
    };
    if (images == null) {
        return <></>
    }
    return (
        <div className={`carousel-container rounded-lg w-full ${className}`}>
            <div
                className="selected-image mb-4"
            >
                <img src={selectedImage} className="max-h-[350px] mx-auto rounded-md" />
            </div>
            <div className="carousel">
                <div className="carousel__images mr-[30px] rounded-md">
                    {images &&
                        images.map((image, idx) => (
                            <div
                                onClick={() => handleSelectedImageChange(idx)}
                                style={{ backgroundImage: `url(${image})` }}
                                key={idx}
                                className={` cursor-pointer carousel__image rounded-lg ${selectedImageIndex === idx && "carousel__image-selected"}`}
                                ref={(el) => (carouselItemsRef.current[idx] = el)}
                            />
                        ))}

                </div>
                {
                    images?.length > 0 && <div>
                        <button
                            onClick={handleLeftClick}
                            type="button"
                            className="absolute top-0 start-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-prev=""
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg
                                    className="w-4 h-4 text-[color:var(--text)] dark:text-gray-800 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 1 1 5l4 4"
                                    />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>



                        <button
                            onClick={handleRightClick}
                            type="button"
                            className="absolute top-0 end-0 z-1 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-next=""
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg
                                    className="w-4 h-4 text-[color:var(--text)] dark:text-gray-800 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                }

            </div>
        </div>
    );
};

export default ImageCarousel;