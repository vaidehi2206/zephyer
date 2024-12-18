import React from 'react'
import AnimatedTitle from './AnimatedTitle';
import Button from './Button';

// Component to handle image clipping with specific CSS classes
const ImageClipBox = ({ src, clipClass }) => (
    <div className={clipClass}> {/* Apply the clipping class to the container */}
        <img 
            src={src} 
        />
    </div>
);

const Contact = () => {
  return (
    <div 
        id='contact' // Section ID for the contact area
        className='my-20 min-h-96 w-screen px-10' // Layout styling for spacing and responsiveness
    >
        <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>
             {/* Left side images with clipping effects */}
            <div className='absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
                {/* Image with clipping path and effect */}
                <ImageClipBox
                    clipClass='contact-clip-path-1'
                    src='img/contact-1.webp' // Image source
                />
                {/* Second image with different clipping path */}
                <ImageClipBox
                    clipClass='contact-clip-path-2 lg:translate-y-40 translate-y-60'
                    src='img/contact-2.webp'    
                />
            </div>

            {/* Right side images with positioning and scaling effects */}
            <div className='absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80'>
            {/* Image with scaling effect */}
            <ImageClipBox 
                clipClass='absolute md:scale-125' // Apply scale on larger screens
                src='/img/swordman-partial.webp'
            />
            {/* Main swordman image with a custom clipping path */}
            <ImageClipBox
                src="/img/swordman.webp"
                clipClass="sword-man-clip-path md:scale-125" // Apply custom clipping and scaling
            />
            </div>

            {/* Centered text and button */}
            <div className="flex flex-col items-center text-center">
                {/* Subtitle text */}
                <p className='mb-10 font-general text-[10px] uppercase'>
                    Join Zephyer
                </p>
                
                {/* Animated title for the section */}
                <AnimatedTitle 
                    title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
                    className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[0.9]" // Custom styling for the animated title
                />

                {/* Button for contacting */}
                <Button title="contact us" containerClass="mt-10 cursor-pointer" />  
            </div>
        </div>
    </div>
  )
}

export default Contact