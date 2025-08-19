'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
    const logoRef = useRef<HTMLDivElement>(null);
    const rose1Ref = useRef<HTMLImageElement>(null);
    const rose2Ref = useRef<HTMLImageElement>(null);
    const diaryRef = useRef<HTMLImageElement>(null);
    const menuRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const rose1 = rose1Ref.current;
        const rose2 = rose2Ref.current;
        const diary = diaryRef.current;

        if (!rose1 || !rose2 || !diary) return;

        // Initial state - hide the roses
        gsap.set(rose1, {
            opacity: 0,
            scale: 0.8,
            rotation: -10,
            x: -50 // Start from left
        });

        gsap.set(rose2, {
            opacity: 0,
            scale: 0.8,
            rotation: -10,
            x: 50 // Start from right
        });

        gsap.set(diary, {
            opacity: 0,
            scale: 0.8,
            rotation: -10,
            x: -50 // Start from left like rose1
        });

        // Page load animation for logo images
        const logoAnimation = gsap.timeline();
        
        logoAnimation.to([rose1, rose2, diary], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0, // Slide to center
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2
        })
        .to([rose1, rose2, diary], {
            rotation: 5,
            duration: 0.6,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        }, "-=0.8");

        // Menu animations
        const menuItems = menuRefs.current.filter(Boolean);
        
        // Initial state for menu items
        gsap.set(menuItems, {
            opacity: 0,
            y: -20,
            scale: 0.9
        });

        // Staggered menu animation
        gsap.to(menuItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 1.2 // Start after logo animation
        });

        // Menu hover effects
        const cleanupFunctions: (() => void)[] = [];
        
        menuItems.forEach((item, index) => {
            if (!item) return;

            const handleMouseEnter = () => {
                gsap.to(item, {
                    scale: 1.1,
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(item, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);

            // Store cleanup function
            cleanupFunctions.push(() => {
                item.removeEventListener('mouseenter', handleMouseEnter);
                item.removeEventListener('mouseleave', handleMouseLeave);
            });
        });

        // Return cleanup function
        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
        };

    }, []);

    return (
        <nav className="flex items-center justify-between p-16">
            {/* Logo */}
            <div ref={logoRef} className="relative hidden md:block">
                <div className="cursor-pointer">
                    <p className="text-4xl font-light font-great-vibes text-gray-300">Deborah</p>
                    <p className="text-4xl font-light ml-8 font-dancing-script -mt-4 text-gray-300">Emmanuel</p>
                </div>
                <Image
                    ref={rose1Ref}
                    src="/rose.png"
                    alt="logo"
                    width={20}
                    height={20}
                    className="absolute top-[-0.5rem] left-[-1rem]"
                />
                <Image
                    ref={rose2Ref}
                    src="/red-rose.png"
                    alt="logo"
                    width={30}
                    height={20}
                    className="absolute top-[0.8rem] right-4"
                />
                <Image
                    ref={diaryRef}
                    src="/diary.png"
                    alt="diary"
                    width={25}
                    height={25}
                    className="absolute top-[2rem] left-[-0.5rem]"
                />
            </div>

            {/* Socials */}
            {/* <div className="flex gap-8">
                <Image
                    src="/gmail.png"
                    alt="gmail"
                    width={50}
                    height={50}
                    className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 hover:scale-120"
                />
                <Image
                    src="/twitter.png"
                    alt="twitter"
                    width={50}
                    height={50}
                    className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 hover:scale-120"
                />
                <Image
                    src="/linkedin.png"
                    alt="linkedin"
                    width={50}
                    height={50}
                    className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 hover:scale-120"
                />
            </div> */}

            {/* Menu */}
            <div className="hidden md:flex gap-8">
                <ul className="flex items-center gap-16 font-inter">
                    <li 
                        ref={(el) => { menuRefs.current[0] = el; }}
                        className="font-medium cursor-pointer text-gray-300 hover:text-white transition-colors duration-300 grayscale-0"
                    >
                        Tales of the City
                    </li>
                    <li 
                        ref={(el) => { menuRefs.current[1] = el; }}
                        className="font-medium cursor-pointer text-gray-300 hover:text-white transition-colors duration-300 grayscale-0"
                    >
                        Studio
                    </li>
                    <li 
                        ref={(el) => { menuRefs.current[2] = el; }}
                        className="font-medium cursor-pointer text-gray-300 hover:text-white transition-colors duration-300 grayscale-0"
                    >
                        Reach me
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;