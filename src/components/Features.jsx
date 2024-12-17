import React, { useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

// BentoTilt component - Adds a 3D tilt effect on mouse movement
const BentoTilt = ({ children, className =''}) => {
    // State to hold the transform style for tilt effect
    const [transformStyle, setTransformStyle] = useState('');
    // Ref to the DOM element for bounding rectangle calculation
    const itemRef = useRef();

    // Handle mouse movement and update tilt effect based on position
    const handleMouseMove = (e) => {
        if(!itemRef.current) return;

        // Get the bounding client rectangle of the element
        const { left,top, width, height } = itemRef.current.getBoundingClientRect();

        // Calculate relative mouse position within the element's bounds
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        // Calculate tilt values based on mouse position
        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        // Set new transform style to apply the 3D tilt effect
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

        setTransformStyle(newTransform)
    }

    // Reset the transform style when mouse leaves the element
    const handleMouseLeave = () => {
        setTransformStyle('');
    }

    return (
        <div 
            className={className} 
            ref={itemRef}                           // Attach ref to the element for mouse movement calculations
            onMouseMove={handleMouseMove}           // Trigger tilt effect on mouse move
            onMouseLeave={handleMouseLeave}         // Reset effect on mouse leave
            style={{transform: transformStyle }}    // Apply the transform style dynamically
        >
            {children}  {/* Render child elements */}
        </div>
    )
}
// BentoCard component - Displays a video card with title and description
const BentoCard = ({src, title, description}) => {
    return (
        <div className='relative size-full'>
            {/* Video element that auto-plays, loops, and is muted */}
            <video
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
                <div>
                    {/* Title with optional styling */}
                    <h1 className='bento-title special-font'>
                        {title}
                    </h1>
                    {/* Conditionally render description if provided */}
                    { description && (
                        <p className='mt-3 max-w-64 text-xs'>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

// Features section - Displays multiple BentoTilt components and BentoCard items
const Features = () => {
  return (
    <section className='bg-black pb-52'>
        <div className='container mx-auto px-3 md:px-10'>
            <div className='px-5 py-32'>
                {/* Header and intro text */}
                <p className='font-circular-web text-lg text-blue-50'>
                    Into the Metagame Layer
                </p>
            <p className='max-w md font-circular-web text-lg text-blue-50 opacity-50'>
                Immerse yourself in a rich and ever-expanding universe where a vibrant array of products converge into an interconected overlay experience on your world.
            </p>
            </div>
       
        {/* BentoTilt component with a video card inside */}
        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
            <BentoCard
                src='videos/feature-1.mp4'
                title={<>radia<b>n</b>t</>} 
                description='A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.'
            />
        </BentoTilt>
        {/* Grid layout for multiple BentoTilt components */}
        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
            {/* BentoTilt with BentoCard for feature-2 */}
            <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                <BentoCard
                    src='videos/feature-2.mp4'
                    title={<>zig<b>m</b>a</>}
                    description='An anime and gaming-inspired NFT collection - the IP primed for expansion.' 
                />
            </BentoTilt>
            {/* BentoTilt with BentoCard for feature-3 */}
            <BentoTilt className='bento-tile_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                <BentoCard 
                    src='videos/feature-3.mp4'
                    title={<>n<b>e</b>xus</>}
                    description='A gamified social hub, adding a new dimension of plat to social interaction for Web3 communities.'
                />
            </BentoTilt>
            {/* BentoTilt with BentoCard for feature-4 */}
            <BentoTilt className='bento-tile_1 me-14 md:col-span-1 md:me-0'>
                <BentoCard 
                    src='videos/feature-4.mp4'
                    title={<>az<b>u</b>l</>}
                    description='A cross-world AI agent - elevating your gameplay to be more fun and productive.' 
                />
            </BentoTilt>
            {/* Additional BentoTilt with "Coming Soon" message */}
            <div className='bento-tilt_2'>
                <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                    {/* "Coming Soon" section */}
                    <h1 className='bento-title special-font max-w-64 text-black'>
                        M<b>o</b>re co<b>m</b>ing so<b>o</b>n!
                    </h1>
                    <TiLocationArrow className='m-5 scale-[5] self-end' />
                </div>
            </div>
            
            {/* BentoTilt with video for feature-5 */}
            <div className='bento-tilt_2'>
                <video 
                    src='videos/feature-5.mp4'
                    loop
                    muted 
                    autoPlay
                    className='size-full object-cover object-center'
                />
            </div>
        </div>
        </div>
    </section>
  )
}

export default Features