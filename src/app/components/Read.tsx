"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Read = () => {
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    
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
        if (!carouselRef.current || isHovered) return;

        const carousel = carouselRef.current;
        let animationId: number;
        let position = 0;
        const speed = 1; // pixels per frame

        const animate = () => {
            if (!isHovered) {
                position -= speed;
                
                // Reset position when first item is completely out of view
                const itemWidth = 500 + 16; // width + gap
                if (position <= -itemWidth) {
                    position = 0;
                }
                
                carousel.style.transform = `translateX(${position}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isHovered]);

    return (
        <div className="h-screen px-10">
            <div className="leading-16 py-10">
                <p className="text-[50px] md:text-[70px] leading-10 md:leading-16 font-sans-serif font-light tracking-tighter">I really love to read</p>
                <p className="text-[50px] md:text-[70px] leading-10 md:leading-16 font-sans-serif font-light tracking-tighter">Some call it a scary obsession</p>
                <p className="text-[20px] leading-5 py-4 md:py-0 md:leading-16 md:text-[40px] font-architects-daughter font-light tracking-tighter">Here is a few books I&apos;ve read & will recommend</p>
            </div>

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
                    {books.map((book, index) => (
                        <div 
                            key={index}
                            className="cursor-pointer hover:scale-105 transition-all duration-600 w-fit flex-shrink-0"
                        >
                            <Image src={book.src} alt={book.alt} width={500} height={100} />
                        </div>
                    ))}
                    {/* Duplicate items for seamless loop */}
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
        </div>
    );
}

export default Read;