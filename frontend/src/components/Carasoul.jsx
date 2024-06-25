import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'

export const Carasoul = (props) => {
    const [carouselHeight, setCarouselHeight] = useState(300);

    const handleResize = () => {
        // Adjust the height based on screen width or any other condition
        const newHeight = window.innerWidth > 300 ? 300 : 150;
        setCarouselHeight(newHeight);
    };

    useEffect(() => {
        // Attach the resize event listener when the component mounts
        window.addEventListener('resize', handleResize);

        // Detach the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    var items = [
        {
            src: "https://img.freepik.com/free-vector/black-friday-sale-with-realistic-3d-paper-page_1361-3675.jpg"
        },
        {
            src: "https://img.freepik.com/free-vector/black-friday-abstract-sale-with-memphis-style_1361-4014.jpg"
        }
    ]

    return (
        <div className='relative'>
        <Carousel height={carouselHeight}  indicatorContainerProps={{ style: { display: 'none' } }}>
            {
                items.map((item, i) => <img src={item.src} className='w-full h-full object-cover' key={i} />)
            }
        </Carousel>
        </div>
    )
}