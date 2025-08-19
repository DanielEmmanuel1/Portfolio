import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="h-[100vh] w-full">
        <Navbar />
        <Hero />
      </div>

    </div>
  );
}
