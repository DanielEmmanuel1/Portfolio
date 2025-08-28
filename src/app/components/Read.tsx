"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Read = () => {
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef(0);
    
    const books = [
        { src: "/half-yellow.png", alt: "Half Yellow" },
        { src: "/purple.png", alt: "Purple" },
        { src: "/half-yellow.png", alt: "Half Yellow" },
        { src: "/purple.png", alt: "Purple" },
        { src: "/half-yellow.png", alt: "Half Yellow" },
        { src: "/purple.png", alt: "Purple" },
        { src: "/half-yellow.png", alt: "Half Yellow" },
        { src: "/purple.png", alt: "Purple" },
    ];

    useEffect(() => {
        if (!carouselRef.current) return;

        const carousel = carouselRef.current;
        let animationId: number;
        const speed = 1; // pixels per frame

        const animate = () => {
            if (!isHovered) {
                positionRef.current -= speed;
                
                // Calculate the width of one complete set of items
                const itemWidth = 500 + 16; // width + gap
                const totalWidth = itemWidth * books.length;
                
                // When we've moved one complete set, reset to show the duplicate set
                if (positionRef.current <= -totalWidth) {
                    positionRef.current = 0;
                }
                
                carousel.style.transform = `translateX(${positionRef.current}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isHovered, books.length]);

    const moveForward = () => {
        if (!carouselRef.current) return;
        
        const itemWidth = 500 + 16; // width + gap
        positionRef.current -= itemWidth * 2; // Move 2 items forward
        
        // Handle loop reset
        const totalWidth = itemWidth * books.length;
        if (positionRef.current <= -totalWidth) {
            positionRef.current = 0;
        }
        
        carouselRef.current.style.transform = `translateX(${positionRef.current}px)`;
    };

    const moveBackward = () => {
        if (!carouselRef.current) return;
        
        const itemWidth = 500 + 16; // width + gap
        positionRef.current += itemWidth * 2; // Move 2 items backward
        
        // Handle loop reset
        const totalWidth = itemWidth * books.length;
        if (positionRef.current > 0) {
            positionRef.current = -totalWidth + itemWidth * 2;
        }
        
        carouselRef.current.style.transform = `translateX(${positionRef.current}px)`;
    };

    return (
        <div className="h-screen px-10">
            <div className="leading-16 py-10">
                <p className="text-[50px] md:text-[70px] leading-10 md:leading-16 font-sans-serif font-light tracking-tighter">I really love to read</p>
                <p className="text-[50px] md:text-[70px] leading-10 md:leading-16 font-sans-serif font-light tracking-tighter">Some call it a scary obsession</p>
                <p className="text-[20px] leading-5 py-4 md:py-0 md:leading-16 md:text-[40px] font-architects-daughter font-light tracking-tighter">Here is a few books I&apos;ve read & will recommend</p>
            </div>

            <div className="relative">
                <div 
                    className="overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div 
                        ref={carouselRef}
                        className="flex md:flex-row flex-col gap-4 transition-transform duration-300 ease-linear"
                        style={{ width: 'fit-content' }}
                    >
                        {/* First set of items */}
                        {books.map((book, index) => (
                            <div 
                                key={`first-${index}`}
                                className="cursor-pointer transition-all duration-600 w-fit flex-shrink-0"
                            >
                                <Image src={book.src} alt={book.alt} width={500} height={100} />
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {books.map((book, index) => (
                            <div 
                                key={`duplicate-${index}`}
                                className="cursor-pointer hover:scale-105 transition-all duration-600 w-fit flex-shrink-0"
                            >
                                <Image src={book.src} alt={book.alt} width={500} height={100} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                    onClick={moveBackward}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 z-10"
                    aria-label="Previous"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>

                <button 
                    onClick={moveForward}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 z-10"
                    aria-label="Next"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Read;