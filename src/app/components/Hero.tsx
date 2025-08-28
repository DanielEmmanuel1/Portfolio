'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Hero = () => {
    const [expandedImage, setExpandedImage] = useState<number | null>(null);
    const scrapdRef = useRef<HTMLImageElement>(null);
    const scrapeRef = useRef<HTMLImageElement>(null);
    const scrappbRef = useRef<HTMLImageElement>(null);
    const scrapbRef = useRef<HTMLImageElement>(null);
    const scrapyRef = useRef<HTMLImageElement>(null);

    // Stacked card refs
    const card1Ref = useRef<HTMLImageElement>(null);
    const card2Ref = useRef<HTMLImageElement>(null);
    const card3Ref = useRef<HTMLImageElement>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    // Panel refs
    const overviewPanelRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    
    // Carousel state ref
    const carouselStateRef = useRef({
        isActive: false,
        currentIndex: 0,
        interval: null as NodeJS.Timeout | null
    });

    // Text and icon refs
    const introTextRef = useRef<HTMLDivElement>(null);
    const debbyIconRef = useRef<HTMLImageElement>(null);
    const mivaIconRef = useRef<HTMLImageElement>(null);
    const poemTextRef = useRef<HTMLDivElement>(null);
    const claudeIconRef = useRef<HTMLImageElement>(null);

    // Mobile container ref for animation
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const mobileIntroTextRef = useRef<HTMLDivElement>(null);

    // Image data with details
    const stackedImages = [
        {
            id: 1,
            image: "/luv.png",
            title: "Summer Love",
            date: "July 15, 2023",
            event: "Beach Photoshoot",
            location: "Lagos Beach",
            description: "A beautiful summer day captured during a beach photoshoot. The golden hour lighting created the perfect atmosphere for this romantic setting. The gentle waves and warm breeze made this one of the most memorable shoots of the year.",
            details: "This photo was taken during a collaborative project with local photographers. The natural lighting and candid moments captured the essence of summer romance perfectly. The shoot lasted for about 3 hours, starting from late afternoon into the golden hour."
        },
        {
            id: 2,
            image: "/gele.png",
            title: "Traditional Elegance",
            date: "September 8, 2023",
            event: "Cultural Festival",
            location: "National Arts Theatre",
            description: "A stunning display of traditional Nigerian fashion during the annual cultural festival. The gele (head tie) represents the rich heritage and elegance of Nigerian women. This moment captured the perfect blend of tradition and modern style.",
            details: "This was part of a larger cultural celebration that brought together artists, designers, and performers from across Nigeria. The festival showcased the diversity and beauty of Nigerian culture through fashion, music, and dance."
        },
        {
            id: 3,
            image: "/blouse.png",
            title: "Urban Style",
            date: "November 22, 2023",
            event: "Fashion Week",
            location: "Victoria Island",
            description: "A contemporary fashion shoot that blended urban aesthetics with African prints. The vibrant colors and modern styling created a unique fusion of traditional and contemporary fashion elements.",
            details: "This shoot was part of Lagos Fashion Week, featuring emerging designers and their innovative takes on African fashion. The location was carefully chosen to reflect the modern, cosmopolitan nature of Lagos."
        }
    ];

    // Handle image click with enhanced animation
    const handleImageClick = (imageId: number) => {
        console.log("handleImageClick called with imageId:", imageId);
        console.log("Current carousel index:", carouselStateRef.current.currentIndex);

        // Store the clicked image ID for carousel to resume from
        carouselStateRef.current.currentIndex = imageId - 1;

        // Completely stop the carousel and prevent it from running
        if (cardContainerRef.current) {
            // Stop carousel by triggering mouseleave
            const event = new Event('mouseleave');
            cardContainerRef.current.dispatchEvent(event);
            
            // Also force stop any ongoing animations
            const card1 = card1Ref.current;
            const card2 = card2Ref.current;
            const card3 = card3Ref.current;
            
            if (card1 && card2 && card3) {
                // Kill any ongoing GSAP animations on all images
                gsap.killTweensOf([card1, card2, card3]);
            }
        }

        // Force the clicked image to be visible and on top
        const card1 = card1Ref.current;
        const card2 = card2Ref.current;
        const card3 = card3Ref.current;
        
        if (card1 && card2 && card3) {
            const images = [card1, card2, card3];
            const clickedIndex = imageId - 1;
            
            console.log(`Setting image ${imageId} (index ${clickedIndex}) to top`);
            console.log(`Image ${imageId} corresponds to: ${stackedImages[clickedIndex]?.title}`);
            
            // Immediately set clicked image to top and make it fully visible
            gsap.set(images[clickedIndex], {
                zIndex: 100,
                x: 0,
                opacity: 1,
                scale: 1,
                filter: "grayscale(0%)"
            });
            
            // Set other images to lower z-index and grayscale
            images.forEach((img, index) => {
                if (index !== clickedIndex) {
                    gsap.set(img, { 
                        zIndex: 10 + index,
                        filter: "grayscale(100%)"
                    });
                }
            });
        }

        // Toggle panel state
        if (expandedImage === imageId) {
            console.log("Closing panel for image:", imageId);
            closePanel();
        } else {
            console.log("Opening panel for image:", imageId);
            setExpandedImage(imageId);
        }
    };

    const closePanel = () => {
        const panel = overviewPanelRef.current;
        const overlay = overlayRef.current;
        const currentExpandedImage = expandedImage; // Store before setting to null

        if (panel && overlay) {
            const closeTl = gsap.timeline({
                onComplete: () => {
                    setExpandedImage(null);
                    
                    // Get the current image that was clicked
                    const card1 = card1Ref.current;
                    const card2 = card2Ref.current;
                    const card3 = card3Ref.current;
                    
                    if (card1 && card2 && card3) {
                        // Restore the clicked image and prepare for carousel resume
                        const images = [card1, card2, card3];
                        const clickedImageIndex = currentExpandedImage ? currentExpandedImage - 1 : carouselStateRef.current.currentIndex;
                        
                        console.log("Resuming carousel from image index:", clickedImageIndex, "for image ID:", currentExpandedImage);
                        
                        // First, reset all images to grayscale
                        gsap.to(images, {
                            filter: "grayscale(100%)",
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        
                        // Then set clicked image to top and remove grayscale
                        gsap.set(images[clickedImageIndex], {
                            zIndex: 50,
                            x: 0,
                            opacity: 1,
                            scale: 1
                        });
                        
                        // Set other images to proper positions
                        images.forEach((img, index) => {
                            if (index !== clickedImageIndex) {
                                const scale = index === 0 ? 1 : index === 1 ? 0.95 : 0.9;
                                gsap.set(img, {
                                    zIndex: 10 + index,
                                    x: 0,
                                    opacity: 1,
                                    scale: scale
                                });
                            }
                        });

                        // Resume carousel from the clicked image after a delay
                        setTimeout(() => {
                            if (cardContainerRef.current) {
                                const event = new Event('mouseenter');
                                cardContainerRef.current.dispatchEvent(event);
                            }
                        }, 1000);
                    }
                }
            });

            closeTl.to(panel, {
                x: "100%",
                duration: 0.6,
                ease: "power3.inOut"
            })
            .to(overlay, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.4");
        }
    };

    const selectedImage = stackedImages.find(img => img.id === expandedImage);

    // Enhanced panel animation when expandedImage changes
    useEffect(() => {
        const panel = overviewPanelRef.current;
        const overlay = overlayRef.current;

        if (panel && overlay && expandedImage) {
            gsap.set(panel, {
                x: "100%"
            });
            gsap.set(overlay, {
                opacity: 0
            });

            const openTl = gsap.timeline();

            openTl.to(overlay, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
            .to(panel, {
                x: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.2");

            // Animate panel content
            const panelContent = panel.querySelectorAll('.panel-content > *');
            gsap.set(panelContent, {
                y: 30,
                opacity: 0
            });

            gsap.to(panelContent, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.4
            });
        }
    }, [expandedImage]);

    // Manage carousel state when panel opens/closes
    useEffect(() => {
        const cardContainer = cardContainerRef.current;
        if (!cardContainer) return;

        if (expandedImage) {
            // Panel is open - stop carousel immediately
            console.log("Panel opened - stopping carousel");
            const event = new Event('mouseleave');
            cardContainer.dispatchEvent(event);
        }
    }, [expandedImage]);

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
            gsap.set(mobileContainer, {
                y: 50,
                opacity: 0
            });

            gsap.set([scrapd, scrape, card1], {
                y: 30,
                opacity: 0
            });

            gsap.to(mobileContainer, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });

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
            gsap.set(mobileIntroText, {
                y: 100,
                opacity: 0
            });

            gsap.to(mobileIntroText, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "back.out(2)",
                delay: 0.3
            });
        }

        // 1. LETTERS ANIMATION: Smooth upscale flow from left to right (Desktop only)
        gsap.set([scrapd, scrape, scrappb, scrapb, scrapy], {
            scale: 0.5,
            opacity: 0.3
        });

        gsap.to([scrapd, scrape, scrappb, scrapb, scrapy], {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
        });

        // 2. STACKED CARDS: Slide up from bottom with different rotations
        gsap.set(card1, {
            y: 200,
            opacity: 0,
            rotation: -5,
            zIndex: 50 // First image should be on top initially
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
        const images = [card1, card2, card3];
        const cardCleanupFunctions: (() => void)[] = [];

        if (cardContainer) {
            const startCarousel = () => {
                // Don't start carousel if panel is open or already active
                if (expandedImage || carouselStateRef.current.isActive) {
                    console.log("Carousel blocked - panel open or already active");
                    return;
                }
                
                // Add a small delay to prevent immediate restart
                setTimeout(() => {
                    if (expandedImage || carouselStateRef.current.isActive) {
                        return;
                    }
                    
                    console.log("Starting carousel");
                    carouselStateRef.current.isActive = true;

                    // Remove grayscale from all images
                    gsap.to(images, {
                        filter: "grayscale(0%)",
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    // Use the stored current index from carouselStateRef
                    console.log("Starting carousel with current index:", carouselStateRef.current.currentIndex);
                    
                    // Set the current image to top and remove grayscale
                    gsap.set(images[carouselStateRef.current.currentIndex], { 
                        zIndex: 50,
                        filter: "grayscale(0%)"
                    });
                    
                    // Set other images to lower z-index and grayscale
                    images.forEach((img, index) => {
                        if (index !== carouselStateRef.current.currentIndex) {
                            gsap.set(img, { 
                                zIndex: 10 + index,
                                filter: "grayscale(100%)"
                            });
                        }
                    });

                    carouselStateRef.current.interval = setInterval(() => {
                        // Don't continue carousel if panel is open
                        if (expandedImage) {
                            console.log("Carousel stopped - panel opened");
                            if (carouselStateRef.current.interval) {
                                clearInterval(carouselStateRef.current.interval);
                                carouselStateRef.current.interval = null;
                            }
                            carouselStateRef.current.isActive = false;
                            return;
                        }

                        // Check again before starting animation
                        if (expandedImage) return;

                        // Animate current image out
                        gsap.to(images[carouselStateRef.current.currentIndex], {
                            x: -100,
                            opacity: 0,
                            scale: 0.8,
                            duration: 2.0,
                            ease: "power2.out"
                        });

                        // Move to next image
                        carouselStateRef.current.currentIndex = (carouselStateRef.current.currentIndex + 1) % images.length;

                        // Set up next image
                        gsap.set(images[carouselStateRef.current.currentIndex], {
                            x: 100,
                            opacity: 0,
                            scale: 0.8,
                            zIndex: 50 // Ensure the next image is on top
                        });

                        // Animate next image in
                        gsap.to(images[carouselStateRef.current.currentIndex], {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.0,
                            ease: "power2.out"
                        });

                        // Set other images to lower z-index
                        images.forEach((img, index) => {
                            if (index !== carouselStateRef.current.currentIndex) {
                                gsap.set(img, { zIndex: 10 + index });
                            }
                        });
                    }, 3000);
                }, 100); // Small delay to prevent immediate restart
            };

            const stopCarousel = () => {
                if (carouselStateRef.current.interval) {
                    clearInterval(carouselStateRef.current.interval);
                    carouselStateRef.current.interval = null;
                }
                
                carouselStateRef.current.isActive = false;

                // Reset all images to original positions with grayscale
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

                // Reset z-index to original values
                gsap.set(images[0], { zIndex: 10 });
                gsap.set(images[1], { zIndex: 20 });
                gsap.set(images[2], { zIndex: 30 });

                carouselStateRef.current.currentIndex = 0;
            };

            cardContainer.addEventListener('mouseenter', startCarousel);
            cardContainer.addEventListener('mouseleave', stopCarousel);

            cardCleanupFunctions.push(() => {
                cardContainer.removeEventListener('mouseenter', startCarousel);
                cardContainer.removeEventListener('mouseleave', stopCarousel);
                if (carouselStateRef.current.interval) {
                    clearInterval(carouselStateRef.current.interval);
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

        return () => {
            cardCleanupFunctions.forEach(cleanup => cleanup());
            letterCleanupFunctions.forEach(cleanup => cleanup());
        };

    }, []);

    return (
        <div className="relative">
            {/* Letters Section - Mobile Stacked, Desktop Row */}
            <div className="relative flex justify-center items-center z-50">
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
                            className="absolute top-28 left-20 transform rotate-10 shadow-lg w-full h-full object-cover cursor-pointer"
                            style={{ zIndex: 10 }}
                            onClick={() => handleImageClick(3)}
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
            <div className="flex justify-center items-center mt-8 md:mt-[-90px] relative z-50">
                {/* Desktop: Original stacked cards */}
                <div ref={cardContainerRef} className="hidden md:block relative w-[550px] h-[600px] cursor-pointer group">
                    <Image
                        ref={card1Ref}
                        src="/luv.png"
                        alt="Card 1"
                        width={550}
                        height={600}
                        className="transform -rotate-5 grayscale-100 hover:grayscale-0 shadow-lg absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                        style={{ zIndex: expandedImage === 1 ? 100 : 10, pointerEvents: 'auto' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("Card 1 clicked - Image ID: 1 (Summer Love)");
                            handleImageClick(1);
                        }}
                    />
                    <Image
                        ref={card2Ref}
                        src="/gele.png"
                        alt="Card 2"
                        width={550}
                        height={600}
                        className="transform -rotate-12 hover:-rotate-10 grayscale-100 hover:grayscale-0 shadow-lg absolute top-0 left-0 translate-y-[-8px] scale-95 w-full h-full object-cover cursor-pointer"
                        style={{ zIndex: expandedImage === 2 ? 100 : 20, pointerEvents: 'auto' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("Card 2 clicked - Image ID: 2 (Traditional Elegance)");
                            handleImageClick(2);
                        }}
                    />
                    <Image
                        ref={card3Ref}
                        src="/blouse.png"
                        alt="Card 3"
                        width={550}
                        height={600}
                        className="transform -rotate-18 grayscale-100 hover:grayscale-0 shadow-lg absolute top-0 left-0 translate-y-[-16px] scale-90 w-full h-full object-cover cursor-pointer"
                        style={{ zIndex: expandedImage === 3 ? 100 : 30, pointerEvents: 'auto' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("Card 3 clicked - Image ID: 3 (Urban Style)");
                            handleImageClick(3);
                        }}
                    />
                </div>
            </div>

            <div ref={introTextRef} className="absolute bottom-[15px] left-60 cursor-pointer hidden md:block">
                <div className="text-center font-sans-serif font-light text-xl w-[480px]">
                    Hi, I&apos;m Deborah
                    <Image
                        ref={debbyIconRef}
                        src="/debby.png"
                        alt="Deborah"
                        width={100}
                        height={40}
                        className="inline-block mx-2 align-middle"
                    />
                    , a passionate <span className="text-white font-bold underline decoration-2 underline-offset-4">Content </span>creator and  <span className="text-white font-bold underline decoration-2 underline-offset-4">storyteller</span> who turns <span className="text-white font-bold decoration-2 underline-offset-4">ideas</span> into <span className="text-white font-bold underline decoration-2 underline-offset-4">engaging</span> content, balancing corporate life at Miva
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
                className="block md:hidden mt-4 text-center font-sans-serif text-md md:text-base font-light max-w-[350px] md:max-w-[400px] text-gray-400 leading-relaxed mx-auto"
            >
                Hi, I&apos;m Deborah
                <Image
                    src="/debby.png"
                    alt="Deborah"
                    width={60}
                    height={24}
                    className="inline-block mx-1 align-middle w-12 h-5 md:w-16 md:h-6"
                />
                , a passionate <span className="text-white font-bold underline decoration-2 underline-offset-4">Content </span>creator and <span className="text-white font-bold underline decoration-2 underline-offset-4">storyteller</span> who turns <span className="text-white font-bold underline decoration-2 underline-offset-4">idea</span> into <span className="text-white font-bold underline decoration-2 underline-offset-4">engaging</span> content, balancing corporate life at Miva
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

            {/* Overlay */}
            {expandedImage && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
                    onClick={closePanel}
                />
            )}

            {/* Enhanced Overview Panel */}
            {expandedImage && selectedImage && (
                <div
                    ref={overviewPanelRef}
                    className="fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-[#0F0E0E] overflow-y-auto z-50 shadow-2xl"
                >
                    <div className="panel-content p-8 h-full">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-white mb-3 leading-tight">{selectedImage.title}</h3>
                                <p className="text-blue-300 text-lg font-medium">{selectedImage.date}</p>
                                <p className="text-purple-300 text-base">{selectedImage.event}</p>
                                <p className="text-gray-400 text-sm">{selectedImage.location}</p>
                            </div>
                            <button
                                onClick={closePanel}
                                className="text-gray-400 hover:text-white text-3xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 hover:rotate-90 transform transition-all duration-300 ml-4 flex-shrink-0"
                            >
                                ×
                            </button>
                        </div>

                        {/* Image */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative group">
                                <Image
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    width={300}
                                    height={400}
                                    className="rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mb-8 ">
                            <h4 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                                About This Moment
                            </h4>
                            <p className="text-gray-300 leading-relaxed text-base">
                                {selectedImage.description}
                            </p>
                        </div>

                        {/* Details Section */}
                        <div className="mb-8">
                            <h4 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
                                Event Details
                            </h4>
                            <p className="text-gray-300 leading-relaxed text-base">
                                {selectedImage.details}
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto pt-8">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 w-full justify-center group shadow-lg hover:shadow-xl transform hover:scale-105">
                                <span>View Full Gallery</span>
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </button>
                        </div>
            </div>
                </div>
            )}
        </div>
    );
}

export default Hero;