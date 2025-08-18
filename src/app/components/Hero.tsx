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
    const luzRef = useRef<HTMLImageElement>(null);

    // Stacked card refs
    const card1Ref = useRef<HTMLImageElement>(null);
    const card2Ref = useRef<HTMLImageElement>(null);
    const card3Ref = useRef<HTMLImageElement>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

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

        if (!scrapd || !scrape || !scrappb || !scrapb || !scrapy || !card1 || !card2 || !card3) return;

        // 1. LETTERS ANIMATION: Smooth upscale flow from left to right
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
        <div className="relative">
            <div className="flex gap-5 items-center justify-center">
                <Image
                    ref={scrapdRef}
                    src="/scrapd.png"
                    alt="Hero"
                    width={270}
                    height={600}
                    className="transform -rotate-10 cursor-pointer hover:scale-150"
                />
                <Image
                    ref={scrapeRef}
                    src="/scrape.png"
                    alt="Hero"
                    width={270}
                    height={600}
                    className="transform -rotate-10 cursor-pointer hover:scale-150"
                />
                <Image
                    ref={scrappbRef}
                    src="/scrappb.png"
                    alt="Hero"
                    width={270}
                    height={600}
                    className="transform -rotate-10 cursor-pointer hover:scale-150"
                />
                <Image
                    ref={scrapbRef}
                    src="/scrapb.png"
                    alt="Hero"
                    width={270}
                    height={600}
                    className="transform -rotate-[-60deg] cursor-pointer hover:scale-150"
                />
                <Image
                    ref={scrapyRef}
                    src="/scrapy.png"
                    alt="Hero"
                    width={240}
                    height={600}
                    className="transform -rotate-[-10deg] cursor-pointer hover:scale-150"
                />
            </div>

            {/* Stacked Cards */}
            <div className="flex items-center justify-center mt-[-90px]">
                <div ref={cardContainerRef} className="relative w-[550px] h-[600px] cursor-pointer group">
                    <Image
                        ref={card1Ref}
                        src="/luv.png"
                        alt="Card 1"
                        width={550}
                        height={600}
                        className="transform -rotate-5 grayscale-100 hover:grayscale-0 rounded-lg shadow-lg absolute top-0 left-0"
                        style={{ zIndex: 10 }}
                    />
                    <Image
                        ref={card2Ref}
                        src="/gele.png"
                        alt="Card 2"
                        width={550}
                        height={600}
                        className="transform -rotate-12 hover:-rotate-10 grayscale-100 hover:grayscale-0 rounded-lg shadow-lg absolute top-0 left-0 translate-y-[-8px] scale-95"
                        style={{ zIndex: 20 }}
                    />
                    <Image
                        ref={card3Ref}
                        src="/blouse.png"
                        alt="Card 3"
                        width={550}
                        height={600}
                        className="transform -rotate-18 grayscale-100 hover:grayscale-0 rounded-lg shadow-lg absolute top-0 left-0 translate-y-[-16px] scale-90"
                        style={{ zIndex: 30 }}
                    />
                </div>
            </div>

            <div className="absolute bottom-[-20px] left-60">
                <p className="text-center font-architects-daughter text-2xl font-bold w-[500px]">
                    Hi, I&apos;m Deborah
                    <Image
                        src="/debby.png"
                        alt="Deborah"
                        width={100}
                        height={40}
                        className="inline-block mx-2 align-middle"
                    />
                    , a passionate <span>Content creator</span> and storyteller who turns ideas into engaging content, balancing corporate life at Miva University with creative pursuits.
                </p>
            </div>
        </div>
    );
}

export default Hero;