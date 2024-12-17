import React, { useEffect, useState, useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const NavBar = () => {
  // State to manage audio playback and indicator animation
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // State to handle scroll position and navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Refs to reference DOM elements
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  // Get current scroll position from the window
  const { y: currentScrollY } = useWindowScroll();

  // Handle navbar visibility based on scroll direction
  useEffect(() => {
    // If at the top, show the navbar
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav class
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav class
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }
    // Update the last scroll position
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

   // Animation for navbar visibility using GSAP
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,     // Translate the navbar vertically
      opacity: isNavVisible ? 1 : 0,  // Fade in/out
      duration: 0.2,                  // Set the animation duration
    });
  }, [isNavVisible]);

  // Toggle the audio and visual indicator when the button is clicked
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);                // Toggle audio playback
    setIsIndicatorActive((prev) => !prev);             // Toggle indicator animation
  };

  // Handle audio playback (play or pause based on the state)
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          {/* Logo and Product Button */}
          <div className='flex items-center gap-7'>
            <img src='/img/logo.png' alt='logo' className='w-10' />
            <Button
              id='product-button'
              title='Products'
              rightIcon={<TiLocationArrow />}
              containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item, index) => (
                <a key={index} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                  {item}
                </a>
              ))}
            </div>

            {/* Button to toggle audio and visual indicator */}
            <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
              <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
              {/* Render indicator lines with animation */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}  // Stagger the animation
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
