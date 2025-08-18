'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
    const logoRef = useRef<HTMLDivElement>(null);
    const rose1Ref = useRef<HTMLImageElement>(null);
    const rose2Ref = useRef<HTMLImageElement>(null);
    const diaryRef = useRef<HTMLImageElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const logo = logoRef.current;
        const rose1 = rose1Ref.current;
        const rose2 = rose2Ref.current;
        const diary = diaryRef.current;

        if (!logo || !rose1 || !rose2 || !diary) return;

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

        // Create timeline for hover animation
        const tl = gsap.timeline({ paused: true });

        // Hover animation sequence
        tl.to([rose1, rose2, diary], {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0, // Slide to center
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.15
        })
        .to([rose1, rose2, diary], {
            rotation: 5,
            duration: 0.4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        }, "-=0.5");

        // Hover event handlers
        const handleMouseEnter = () => {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Start animation after 2000ms delay
            timeoutRef.current = setTimeout(() => {
                tl.restart(); // Use restart instead of play
            }, 200);
        };

        const handleMouseLeave = () => {
            // Clear the timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            // Pause and hide immediately
            tl.pause();
            gsap.to(rose1, {
                opacity: 0,
                scale: 0.8,
                rotation: -10,
                x: -50, // Slide back to left
                duration: 0.5,
                ease: "power2.inOut"
            });

            gsap.to(rose2, {
                opacity: 0,
                scale: 0.8,
                rotation: -10,
                x: 50, // Slide back to right
                duration: 0.5,
                ease: "power2.inOut"
            });
            
            gsap.to(diary, {
                opacity: 0,
                scale: 0.8,
                rotation: -10,
                x: -50, // Slide back to left like rose1
                duration: 0.5,
                ease: "power2.inOut"
            });
        };

        // Add event listeners
        logo.addEventListener('mouseenter', handleMouseEnter);
        logo.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            logo.removeEventListener('mouseenter', handleMouseEnter);
            logo.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div>
            <nav className="flex justify-between items-center p-8">
                {/* Logo */}
                <div ref={logoRef} className="relative cursor-pointer">
                    <div>
                        <p className="text-2xl font-light font-great-vibes text-gray-300 hover:text-white">Deborah</p>
                        <p className="text-2xl font-light ml-8 font-dancing-script -mt-4 text-gray-300 hover:text-white">Emmanuel</p>
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

                {/* Menu */}
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8 font-inter">
                        <li className="font-medium">Tales of the City</li>
                        <li className="font-medium">Studio</li>
                        <li className="font-medium">Reach me</li>
                    </ul>
                </div>
                {/* Socials */}
                <div>
                    <Image
                        src="/gmail.png"
                        alt="instagram"
                        width={50}
                        height={50}
                        className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300"
                    />
                    <Image
                        src="/gmail.png"
                        alt="instagram"
                        width={50}
                        height={50}
                        className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300"
                    />
                    <Image
                        src="/gmail.png"
                        alt="instagram"
                        width={50}
                        height={50}
                        className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300"
                    />
                    <Image
                        src="/gmail.png"
                        alt="instagram"
                        width={50}
                        height={50}
                        className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all duration-300"
                    />
                </div>
                {/* Hamburger */}
                <div></div>
            </nav>

            {/* Font Test Section */}
            <div className="p-8 space-y-4">
                {/* <h2 className="text-xl font-bold mb-4">Font Test - If you see different fonts below, they&apos;re working!</h2> */}

                {/* Cursive and Script Fonts */}
                {/* <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Cursive & Script Fonts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="font-dancing-script text-xl">Dancing Script - Elegant cursive</p>
                        <p className="font-great-vibes text-xl">Great Vibes - Romantic script</p>
                        <p className="font-pacifico text-xl">Pacifico - Fun and casual</p>
                        <p className="font-satisfy text-xl">Satisfy - Handwritten style</p>
                        <p className="font-kaushan-script text-xl">Kaushan Script - Artistic</p>
                        <p className="font-allura text-xl">Allura - Sophisticated script</p>
                        <p className="font-alex-brush text-xl">Alex Brush - Signature style</p>
                        <p className="font-tangerine text-xl">Tangerine - Delicate script</p>
                        <p className="font-lobster text-xl">Lobster - Bold and fun</p>
                        <p className="font-caveat text-xl">Caveat - Natural handwriting</p>
                    </div>
                </div> */}

                {/* Display and Decorative Fonts */}
                {/* <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Display & Decorative Fonts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="font-bebas-neue text-xl">Bebas Neue - Bold display</p>
                        <p className="font-oswald text-xl">Oswald - Clean and modern</p>
                        <p className="font-anton text-xl">Anton - Strong and impactful</p>
                        <p className="font-righteous text-xl">Righteous - Futuristic</p>
                        <p className="font-orbitron text-xl">Orbitron - Sci-fi tech</p>
                        <p className="font-audiowide text-xl">Audiowide - Retro gaming</p>
                        <p className="font-bangers text-xl">Bangers - Comic book style</p>
                        <p className="font-permanent-marker text-xl">Permanent Marker - Handwritten</p>
                        <p className="font-indie-flower text-xl">Indie Flower - Casual</p>
                        <p className="font-rock-salt text-xl">Rock Salt - Chalk style</p>
                    </div>
                </div> */}

                {/* Monospace Fonts */}
                {/* <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Monospace Fonts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="font-vt323 text-xl">VT323 - Retro terminal</p>
                        <p className="font-press-start-2p text-lg">Press Start 2P - Gaming</p>
                        <p className="font-fira-code text-xl">Fira Code - Programming</p>
                        <p className="font-jetbrains-mono text-xl">JetBrains Mono - IDE style</p>
                        <p className="font-source-code-pro text-xl">Source Code Pro - Clean code</p>
                        <p className="font-space-mono text-xl">Space Mono - Spaced out</p>
                    </div>
                </div> */}

                {/* Font Weights */}
                {/* <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Font Weights (Dancing Script)</h3>
                    <div className="space-y-2">
                        <p className="font-dancing-script font-normal text-xl">Normal (400)</p>
                        <p className="font-dancing-script font-medium text-xl">Medium (500)</p>
                        <p className="font-dancing-script font-semibold text-xl">Semi Bold (600)</p>
                        <p className="font-dancing-script font-bold text-xl">Bold (700)</p>
                    </div>
                </div> */}

                {/* Typography Scale */}
                {/* <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Typography Scale (Great Vibes)</h3>
                    <div className="space-y-2">
                        <p className="font-great-vibes text-sm">Small (sm)</p>
                        <p className="font-great-vibes text-base">Base</p>
                        <p className="font-great-vibes text-lg">Large (lg)</p>
                        <p className="font-great-vibes text-xl">Extra Large (xl)</p>
                        <p className="font-great-vibes text-2xl">2XL</p>
                        <p className="font-great-vibes text-3xl">3XL</p>
                        <p className="font-great-vibes text-4xl">4XL</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Navbar;