import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Read from "./components/Read";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="h-[100vh] w-full">
        <Navbar />
        <Hero />
      </div>
      <Read />

    </div>
  );
}
