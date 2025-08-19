'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoRef = useRef<HTMLDivElement>(null);
    const rose1Ref = useRef<HTMLImageElement>(null);
    const rose2Ref = useRef<HTMLImageElement>(null);
    const diaryRef = useRef<HTMLImageElement>(null);
    const menuRefs = useRef<(HTMLLIElement | null)[]>([]);

    // Mobile menu refs
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const mobileOverlayRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const mobileNavbarRef = useRef<HTMLElement>(null);

        useEffect(() => {
        const rose1 = rose1Ref.current;
        const rose2 = rose2Ref.current;
        const diary = diaryRef.current;
        const mobileNavbar = mobileNavbarRef.current;

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

        // Mobile navbar animation - slide from top
        if (mobileNavbar && window.innerWidth < 768) {
            gsap.set(mobileNavbar, {
                y: -100,
                opacity: 0
            });

            gsap.to(mobileNavbar, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "back.out(2)",
                delay: 0.3
            });
        }

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

    // Mobile menu toggle function
    const toggleMobileMenu = () => {
        const mobileMenu = mobileMenuRef.current;
        const mobileOverlay = mobileOverlayRef.current;
        const mobileMenuItems = mobileMenuItemsRef.current.filter(Boolean);
        const hamburger = hamburgerRef.current;

        if (!mobileMenu || !mobileOverlay || !hamburger) return;

        if (!isMobileMenuOpen) {
            // Open menu
            setIsMobileMenuOpen(true);

            // Epic opening animation timeline
            const tl = gsap.timeline();

            // Fade in overlay with scale effect
            tl.to(mobileOverlay, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            }, 0);

            // Epic menu reveal with scale and blur
            tl.to(mobileMenu, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(2.5)"
            }, 0.2);

            // Animate hamburger with epic rotation
            tl.to(hamburger, {
                rotation: 180,
                scale: 1.2,
                duration: 0.5,
                ease: "back.out(2)"
            }, 0.3);

            // Epic staggered menu items with bounce
            gsap.set(mobileMenuItems, {
                opacity: 0,
                y: 60,
                scale: 0.5,
                rotationX: 90
            });

            tl.to(mobileMenuItems, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "back.out(2)",
                stagger: 0.15
            }, 0.4);

        } else {
            // Epic closing animation timeline
            const tl = gsap.timeline();

            // Animate menu items out with epic effect
            tl.to(mobileMenuItems, {
                opacity: 0,
                y: -60,
                scale: 0.5,
                rotationX: -90,
                duration: 0.5,
                ease: "back.in(2)",
                stagger: 0.1
            }, 0);

            // Epic menu exit with scale and blur
            tl.to(mobileMenu, {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: "back.in(2)"
            }, 0.2);

            // Animate hamburger back with bounce
            tl.to(hamburger, {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: "back.out(2)"
            }, 0.3);

            // Hide overlay with epic fade
            tl.to(mobileOverlay, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.in"
            }, 0.4);

            // Update state after animation
            setTimeout(() => {
                setIsMobileMenuOpen(false);
            }, 800);
        }
    };

    return (
        <nav ref={mobileNavbarRef} className="flex items-center justify-between py-10 px-10 md:p-16 relative">
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

            {/* Mobile Logo */}
            <div className="md:hidden relative">
                <div className="cursor-pointer">
                    <p className="text-lg font-light font-great-vibes text-gray-300">Deborah</p>
                    <p className="text-lg font-light ml-3 font-dancing-script -mt-4  text-gray-300">Emmanuel</p>
                </div>
                <Image
                    src="/rose.png"
                    alt="logo"
                    width={12}
                    height={12}
                    className="absolute top-[-0.3rem] left-[-0.5rem] w-3 h-3"
                />
                <Image
                    src="/red-rose.png"
                    alt="logo"
                    width={18}
                    height={12}
                    className="absolute top-[0.4rem] right-2 w-4 h-3"
                />
                <Image
                    src="/diary.png"
                    alt="diary"
                    width={15}
                    height={15}
                    className="absolute top-[1.5rem] left-[-0.3rem] w-3 h-3"
                />
            </div>

            {/* Desktop Menu */}
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

            {/* Mobile Hamburger Menu */}
            <button
                ref={hamburgerRef}
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-300 hover:text-white transition-colors duration-300 z-[9997] bg-[#1C1C18] p-3 rounded-full"
            >
                {isMobileMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                ) : (
                    <Bars3Icon className="w-8 h-8" />
                )}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileOverlayRef}
                className="md:hidden fixed inset-0 bg-black z-[9998] opacity-0 pointer-events-none scale-95"
                onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Full Screen */}
            <div
                ref={mobileMenuRef}
                className="md:hidden fixed inset-0 bg-[#0a0a0a] z-[9999] opacity-0 scale-95 flex items-center justify-center"
            >
                <div className="flex flex-col items-center justify-center h-full w-full p-8 relative">
                                         {/* Close Button */}
                     <button
                         onClick={toggleMobileMenu}
                         className="absolute top-8 right-8 p-2 text-white hover:text-gray-300 transition-colors duration-300 z-[10000]"
                     >
                        <XMarkIcon className="w-8 h-8" />
                    </button>

                    {/* Mobile Menu Header */}
                    <div className="absolute top-8 left-8">
                            <div className="cursor-pointer">
                                <p className="text-lg font-light font-great-vibes text-gray-300">Deborah</p>
                                <p className="text-lg font-light ml-3 font-dancing-script -mt-4  text-gray-300">Emmanuel</p>
                            </div>
                            <Image
                                src="/rose.png"
                                alt="logo"
                                width={12}
                                height={12}
                                className="absolute top-[-0.3rem] left-[-0.5rem] w-3 h-3"
                            />
                            <Image
                                src="/red-rose.png"
                                alt="logo"
                                width={18}
                                height={12}
                                className="absolute top-[0.4rem] right-2 w-4 h-3"
                            />
                            <Image
                                src="/diary.png"
                                alt="diary"
                                width={15}
                                height={15}
                                className="absolute top-[1.5rem] left-[-0.3rem] w-3 h-3"
                            />
                    </div>

                                         {/* Mobile Menu Items - Centered */}
                     <ul className="flex flex-col gap-8 font-inter text-center">
                         <li
                             ref={(el) => { mobileMenuItemsRef.current[0] = el; }}
                             className="font-medium cursor-pointer text-white hover:text-gray-300 transition-colors duration-300 text-4xl md:text-5xl py-4"
                         >
                             Tales of the City.
                         </li>
                         <li
                             ref={(el) => { mobileMenuItemsRef.current[1] = el; }}
                             className="font-medium cursor-pointer text-gray-400 hover:text-white transition-colors duration-300 text-4xl md:text-5xl py-4"
                         >
                             Studio.
                         </li>
                         <li
                             ref={(el) => { mobileMenuItemsRef.current[2] = el; }}
                             className="font-medium cursor-pointer text-gray-400 hover:text-white transition-colors duration-300 text-4xl md:text-5xl py-4"
                         >
                             Reach me.
                         </li>
                     </ul>

                    {/* Mobile Social Links - Bottom */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-8">
                            <Image
                                src="/gmail.png"
                                alt="gmail"
                                width={50}
                                height={50}
                                className="w-8 h-8 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 hover:scale-120"
                            />
                            <Image
                                src="/twitter.png"
                                alt="twitter"
                                width={50}
                                height={50}
                                className="w-8 h-8 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 hover:scale-120"
                            />
                            <Image
                                src="/linkedin.png"
                                alt="linkedin"
                                width={50}
                                height={50}
                                className="w-8 h-8 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 hover:scale-120"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;