import Image from "next/image";

const Read = () => {
    return (
        <div className="h-screen px-10">
            <div className="leading-16 py-10">
                <p className="text-[50px] md:text-[70px] leading-10 md:leading-16 font-sans-serif font-light tracking-tighter">I really love to read</p>
                <p className="text-[50px] md:text-[70px] leading-10 md:leading-16 font-sans-serif font-light tracking-tighter">Some call it a scary obsession</p>
                <p className="text-[20px] leading-5 py-4 md:py-0 md:leading-16 md:text-[40px] font-architects-daughter font-light tracking-tighter">Here is a few books I&apos;ve read & will recommend</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <div className="cursor-pointer hover:scale-105 transition-all duration-600 w-fit">
                    <Image src="/half-yellow.png" alt="Read" width={500} height={100} />
                </div>
                <div className="cursor-pointer hover:scale-105 transition-all duration-600 w-fit">
                    <Image src="/purple.png" alt="Read" width={500} height={100} />
                </div>
                
            </div>
        </div>
    );
}

export default Read;