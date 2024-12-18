import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap';
import RoundedCorners from './RoundedCorners';
import Button from './Button';

const Story = () => {
    // Ref for the image element to apply GSAP animations
    const frameRef = useRef('null');

    // Function to reset the 3D rotation effect when mouse leaves the image
    const handleMouseLeave = () => {
        const element = frameRef.current;

        // Reset the rotation effect to its initial state
        gsap.to(element,  {
            duration: 0.3,
            rotateX: 0, 
            rotateY: 0,
            ease: 'power1.inOut'
        })
    }

    // Function to calculate and apply rotation based on mouse position
    const handleMouseMove = (e) => {
        const {clientX, clientY } = e;
        const element = frameRef.current;

        if(!element) return;

        // Get the element's bounding rectangle
        const rect = element.getBoundingClientRect();
        const x = clientX -rect.left;
        const y = clientY - rect.top;

        // Get the center of the image to calculate rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

         // Calculate the rotation values based on mouse position
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * -10;

        // Apply the rotation effect using GSAP
        gsap.to(element,  {
            duration: 0.3,
            rotateX, rotateY,
            transformPerspective: 500,   // Add perspective to the transformation
            ease: 'power1.inOut'
        })
    }

  return (
    <section 
        id='story'
        className='min-h-dvh w-screen  bg-black text-blue-50'
    >
        <div className='flex size-full flex-col items-center py-10 pb-24'>
            {/* Introductory text */}
            <p className='font-general text-sm uppercase md:text-[10px]'>
                the multiversal ip world
            </p>    
            <div className='relative  size-full'>
                {/* Animated Title Component */}
                <AnimatedTitle
                title='The st<b>o</b>ry of <br /> a hidden real<b>m</b>.'
                sectionId='#story'
                containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                />

                <div className='story-img-container'>
                    <div className='story-img-mask'>
                        <div className='story-img-content'>
                            {/* Image with interactive 3D effect on mouse move */}
                            <img 
                                ref={frameRef} // Attach GSAP animation ref to the image
                                onMouseLeave={handleMouseLeave} // Reset rotation on mouse leave
                                onMouseUp={handleMouseLeave} // Reset rotation on mouse up
                                onMouseEnter={handleMouseLeave} // Reset rotation on mouse enter
                                onMouseMove={handleMouseMove} // Apply rotation on mouse move
                                src='/img/entrance.webp' // Image source
                                alt='entrance' // Image alt text
                                className='object-contain' // Ensure image fits within container
                            />
                        </div>
                    </div>

                    {/* Rounded corner component */}
                    <RoundedCorners />

                </div>
            </div>  

            <div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
                <div className='flex h-full w-fit flex-col items-center md:items-start'>
                     {/* Description text about the realm */}
                    <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start'>
                        Where realms converge, lies Zephyer and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.
                    </p>
                    {/* Button to trigger prologue discovery */}
                    <Button 
                        id='realm-button'
                        title='discover prologue'
                        containerClass='mt-5'
                    />
                </div>
            </div>  
        </div> 
        
    </section>
  )
}

export default Story