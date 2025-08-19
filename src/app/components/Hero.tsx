'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
    const scrapdRef = useRef<HTMLImageElement>(null);
    const scrapeRef = useRef<HTMLImageElement>(null);
    const scrappbRef = useRef<HTMLImageElement>(null);
    const scrapbRef = useRef<HTMLImageElement>(null);
    const scrapyRef = useRef<HTMLImageElement>(null);
    // const luzRef = useRef<HTMLImageElement>(null);

    // Stacked card refs
    const card1Ref = useRef<HTMLImageElement>(null);
    const card2Ref = useRef<HTMLImageElement>(null);
    const card3Ref = useRef<HTMLImageElement>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    // Text and icon refs
    const introTextRef = useRef<HTMLDivElement>(null);
    const debbyIconRef = useRef<HTMLImageElement>(null);
    const mivaIconRef = useRef<HTMLImageElement>(null);
    const poemTextRef = useRef<HTMLDivElement>(null);
    const claudeIconRef = useRef<HTMLImageElement>(null);

    // Mobile container ref for animation
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const mobileIntroTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrapd = scrapdRef.current;
        const scrape = scrapeRef.current;
        const scrappb = scrappbRef.current;
        const scrapb = scrapbRef.current;
        const scrapy = scrapyRef.current;
        const card1 = card1Ref.current;
        const card2 = card2Ref.current;
        const card3 = card3Ref.current;
        const cardContainer = cardContainerRef.current;
        const mobileContainer = mobileContainerRef.current;
        const mobileIntroText = mobileIntroTextRef.current;

        if (!scrapd || !scrape || !scrappb || !card1 || !card2 || !card3) return;

        // MOBILE ANIMATION: Slide up from bottom with smooth easing
        if (mobileContainer) {
            // Set initial state for mobile container and its children
            gsap.set(mobileContainer, {
                y: 50,
                opacity: 0
            });

            gsap.set([scrapd, scrape, card1], {
                y: 30,
                opacity: 0
            });

            // Animate mobile container first
            gsap.to(mobileContainer, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });

            // Then animate the children with stagger
            gsap.to([scrapd, scrape, card1], {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.3,
                delay: 0.3
            });
        }

        // MOBILE INTRO TEXT ANIMATION: Slide up from bottom
        if (mobileIntroText && window.innerWidth < 768) {
            // Set initial state for mobile intro text
            gsap.set(mobileIntroText, {
                y: 100,
                opacity: 0
            });

            // Animate mobile intro text with smooth slide up - matching navbar timing
            gsap.to(mobileIntroText, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "back.out(2)",
                delay: 0.3 // Same delay as navbar
            });
        }

        // 1. LETTERS ANIMATION: Smooth upscale flow from left to right (Desktop only)
        gsap.set([scrapd, scrape, scrappb, scrapb, scrapy], {
            scale: 0.5,
            opacity: 0.3
        });

        // Animate letters with smooth upscale flow
        gsap.to([scrapd, scrape, scrappb, scrapb, scrapy], {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1 // Creates the flowing effect from left to right
        });

        // 2. STACKED CARDS: Slide up from bottom with different rotations
        gsap.set(card1, {
            y: 200,
            opacity: 0,
            rotation: -5,
            zIndex: 10
        });
        gsap.set(card2, {
            y: 200,
            opacity: 0,
            rotation: -12,
            zIndex: 20
        });
        gsap.set(card3, {
            y: 200,
            opacity: 0,
            rotation: -18,
            zIndex: 30
        });

        // Animate stacked cards sliding up with their rotations
        gsap.to(card1, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.5
        });
        gsap.to(card2, {
            y: -8,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.6
        });
        gsap.to(card3, {
            y: -16,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.7
        });

        // 3. CAROUSEL HOVER EFFECT: Swipe through images on hover
        let carouselInterval: NodeJS.Timeout | null = null;
        let currentImageIndex = 0;
        const images = [card1, card2, card3];
        const cardCleanupFunctions: (() => void)[] = [];

        if (cardContainer) {
            const startCarousel = () => {
                // Remove grayscale from all images when carousel starts
                gsap.to(images, {
                    filter: "grayscale(0%)",
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Ensure the current image is on top before starting the carousel
                gsap.set(images[currentImageIndex], {
                    zIndex: 50
                });

                carouselInterval = setInterval(() => {
                    // Slide current image out to the left
                    gsap.to(images[currentImageIndex], {
                        x: -100,
                        opacity: 0,
                        scale: 0.8,
                        duration: 1.5,
                        ease: "power2.out"
                    });

                    // Move to next image
                    currentImageIndex = (currentImageIndex + 1) % images.length;

                    // Ensure the next image is on top before animating it in
                    gsap.set(images[currentImageIndex], {
                        zIndex: 50,
                        x: 100,
                        opacity: 0,
                        scale: 0.8
                    });

                    gsap.to(images[currentImageIndex], {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }, 1000); // Change image every 1000ms
            };

            const stopCarousel = () => {
                if (carouselInterval) {
                    clearInterval(carouselInterval);
                    carouselInterval = null;
                }

                // Reset all images to their original state with grayscale
                gsap.to(images[0], {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "grayscale(100%)",
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.to(images[1], {
                    x: 0,
                    opacity: 1,
                    scale: 0.95,
                    filter: "grayscale(100%)",
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.to(images[2], {
                    x: 0,
                    opacity: 1,
                    scale: 0.9,
                    filter: "grayscale(100%)",
                    duration: 0.4,
                    ease: "power2.out"
                });

                currentImageIndex = 0;
            };

            cardContainer.addEventListener('mouseenter', startCarousel);
            cardContainer.addEventListener('mouseleave', stopCarousel);

            cardCleanupFunctions.push(() => {
                cardContainer.removeEventListener('mouseenter', startCarousel);
                cardContainer.removeEventListener('mouseleave', stopCarousel);
                if (carouselInterval) {
                    clearInterval(carouselInterval);
                }
            });
        }

        // 4. LETTER HOVER EFFECTS: Individual letter scaling
        const letterElements = [scrapd, scrape, scrappb, scrapb, scrapy];
        const letterCleanupFunctions: (() => void)[] = [];

        letterElements.forEach((element) => {
            if (!element) return;

            const handleLetterMouseEnter = () => {
                gsap.to(element, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const handleLetterMouseLeave = () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            element.addEventListener('mouseenter', handleLetterMouseEnter);
            element.addEventListener('mouseleave', handleLetterMouseLeave);

            letterCleanupFunctions.push(() => {
                element.removeEventListener('mouseenter', handleLetterMouseEnter);
                element.removeEventListener('mouseleave', handleLetterMouseLeave);
            });
        });

        // Return cleanup for both card and letter effects
        return () => {
            cardCleanupFunctions.forEach(cleanup => cleanup());
            letterCleanupFunctions.forEach(cleanup => cleanup());
        };

    }, []);

    return (
        <div className="relative pt-10">
            {/* Letters Section - Mobile Stacked, Desktop Row */}
            <div className="relative flex justify-center items-center">
                {/* Mobile: Stacked overlapping letters with slide-up animation */}
                <div ref={mobileContainerRef} className="md:hidden relative w-[300px] h-[400px]">
                    <Image
                        ref={scrapdRef}
                        src="/scrapd.png"
                        alt="Hero"
                        width={270}
                        height={600}
                        className="absolute top-0 left-0 transform -rotate-10 cursor-pointer w-[150px] h-[150px] object-cover"
                        style={{ zIndex: 30 }}
                    />
                    <Image
                        ref={scrapeRef}
                        src="/scrape.png"
                        alt="Hero"
                        width={270}
                        height={600}
                        className="absolute md:top-8 md:right-0 bottom-0 right-0 transform -rotate-5 cursor-pointer w-[150px] h-[150px] object-cover"
                        style={{ zIndex: 20 }}
                    />

                    {/* Mobile: Stacked overlapping cards */}
                    <div className="md:hidden relative w-[200px] h-[220px]">
                        <Image
                            ref={card1Ref}
                            src="/blouse.png"
                            alt="Card 1"
                            width={280}
                            height={320}
                            className="absolute top-28 left-20 transform rotate-10 shadow-lg w-full h-full object-cover"
                            style={{ zIndex: 10 }}
                        />
                    </div>
                </div>

                {/* Desktop: Row layout */}
                <div className="hidden md:flex gap-5 items-center justify-center">
                    <Image
                        ref={scrapdRef}
                        src="/scrapd.png"
                        alt="Hero"
                        width={270}
                        height={600}
                        className="transform -rotate-10 cursor-pointer hover:scale-150 w-[270px]"
                    />
                    <Image
                        ref={scrapeRef}
                        src="/scrape.png"
                        alt="Hero"
                        width={270}
                        height={600}
                        className="transform -rotate-10 cursor-pointer hover:scale-150 w-[270px]"
                    />
                    <Image
                        ref={scrappbRef}
                        src="/scrappb.png"
                        alt="Hero"
                        width={270}
                        height={600}
                        className="transform -rotate-10 cursor-pointer hover:scale-150 w-[270px]"
                    />
                    <Image
                        ref={scrapbRef}
                        src="/scrapb.png"
                        alt="Hero"
                        width={270}
                        height={600}
                        className="transform -rotate-[-60deg] cursor-pointer hover:scale-150 w-[270px]"
                    />
                    <Image
                        ref={scrapyRef}
                        src="/scrapy.png"
                        alt="Hero"
                        width={240}
                        height={600}
                        className="transform -rotate-[-10deg] cursor-pointer hover:scale-150 w-[240px]"
                    />
                </div>
            </div>

            {/* Stacked Cards - Mobile Stacked, Desktop Single */}
            <div className="flex justify-center items-center mt-8 md:mt-[-90px]">

                {/* Desktop: Original stacked cards */}
                <div ref={cardContainerRef} className="hidden md:block relative w-[550px] h-[600px] cursor-pointer group">
                    <Image
                        ref={card1Ref}
                        src="/luv.png"
                        alt="Card 1"
                        width={550}
                        height={600}
                        className="transform -rotate-5 grayscale-100 hover:grayscale-0 shadow-lg absolute top-0 left-0 w-full h-full object-cover"
                        style={{ zIndex: 10 }}
                    />
                    <Image
                        ref={card2Ref}
                        src="/gele.png"
                        alt="Card 2"
                        width={550}
                        height={600}
                        className="transform -rotate-12 hover:-rotate-10 grayscale-100 hover:grayscale-0 shadow-lg absolute top-0 left-0 translate-y-[-8px] scale-95 w-full h-full object-cover"
                        style={{ zIndex: 20 }}
                    />
                    <Image
                        ref={card3Ref}
                        src="/blouse.png"
                        alt="Card 3"
                        width={550}
                        height={600}
                        className="transform -rotate-18 grayscale-100 hover:grayscale-0 shadow-lg absolute top-0 left-0 translate-y-[-16px] scale-90 w-full h-full object-cover"
                        style={{ zIndex: 30 }}
                    />
                </div>
            </div>

            <div ref={introTextRef} className="absolute bottom-[-20px] left-60 cursor-pointer hidden md:block">
                <div className="text-center font-architects-daughter text-2xl font-bold w-[500px]">
                    Hi, I&apos;m Deborah
                    <Image
                        ref={debbyIconRef}
                        src="/debby.png"
                        alt="Deborah"
                        width={100}
                        height={40}
                        className="inline-block mx-2 align-middle"
                    />
                    , a passionate <span className="text-[#cfab8d]">Content </span>creator and  <span className="text-[#33A1E0]">storyteller</span> who turns ideas into <span className="text-amber-400">engaging</span> content, balancing corporate life at Miva
                    <Image
                        ref={mivaIconRef}
                        src="/mivaa.png"
                        alt="Deborah"
                        width={30}
                        height={40}
                        className="inline-block mx-2 align-middle"
                    />
                    University with creative pursuits.
                </div>
            </div>

            {/* Mobile Intro Text - Smaller */}
            <div 
                ref={mobileIntroTextRef}
                className="block md:hidden mt-4 text-center font-architects-daughter text-sm md:text-base font-bold max-w-[300px] md:max-w-[400px] text-gray-400 leading-relaxed mx-auto"
            >
                Hi, I&apos;m Deborah
                <Image
                    src="/debby.png"
                    alt="Deborah"
                    width={60}
                    height={24}
                    className="inline-block mx-1 align-middle w-12 h-5 md:w-16 md:h-6"
                />
                , a passionate <span className="text-[#CFAB8D]">Content </span>creator and <span className="text-[#33A1E0]">storyteller</span> who turns <span className="text-red-400">idea</span> into <span className="text-amber-300">engaging</span> content, balancing corporate life at Miva
                <Image
                    src="/mivaa.png"
                    alt="Miva"
                    width={18}
                    height={24}
                    className="inline-block mx-1 align-middle w-4 h-5 md:w-5 md:h-6"
                />
                University with creative pursuits.
            </div>

            {/* poeams */}
            <div className="absolute top-[400px] right-60 hidden md:block">
                <div className="text-center font-architects-daughter w-[500px]">
                    <div className="text-lg leading-relaxed italic font-light mb-4">
                        <p>I collect fragments of forgotten light,</p>
                        <p>weave them into stories that breathe—</p>
                        <p>each word a brushstroke against silence,</p>
                        <p>each sentence a door left ajar</p>
                        <p>for wonder to slip through.</p>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <span className="text-xl"><span className="text-3xl">-</span> Claude</span>
                        <Image
                            src="/claude.png"
                            alt="Miva University"
                            width={30}
                            height={40}
                            className="inline-block ml-2 align-middle"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;