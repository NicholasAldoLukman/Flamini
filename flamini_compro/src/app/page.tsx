"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Ongoing Project", href: "#projects" },
  { label: "Contact Us", href: "#contact" },
  { label: "About Us", href: "#about" },
];

export default function Home() {
  const buildRef = useRef<HTMLHeadingElement>(null);
  const analyzeRef = useRef<HTMLHeadingElement>(null);
  const [activeNav, setActiveNav] = useState("#home");

  // Animate headline and subheadline
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap").then(({ default: gsap }) => {
        if (buildRef.current) {
          gsap.fromTo(
            buildRef.current,
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );
        }
        if (analyzeRef.current) {
          gsap.fromTo(
            analyzeRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.7, ease: "power3.out" }
          );
        }
      });
    }
  }, []);

  // Handle scroll spy for nav active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "projects", "contact", "about"];
      let found = "#home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = `#${section}`;
            break;
          }
        }
      }
      setActiveNav(found);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* Video Background */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/test.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for darkening video */}
      <div className="fixed top-0 left-0 w-full h-full bg-[#142232]/80 z-10 pointer-events-none" />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 sm:px-10 py-3 bg-[#142232] bg-opacity-95 shadow-md">
        <div className="flex items-center gap-[2px] justify-start">
          <Image
            src="/images/logo.png"
            alt="Flamini Logo"
            width={96}
            height={96}
            className="object-contain -mt-2"
            priority
          />
          <span
            className="text-2xl tracking-tight text-[#e6e6e6] select-none"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, letterSpacing: '0.25em' }}
          >
            FLAMINI
          </span>
        </div>
        <ul className="flex gap-2 sm:gap-6 md:gap-8 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                scroll={false}
                className={`relative px-2 sm:px-3 py-1 text-base sm:text-lg font-medium transition-colors duration-200
                  ${
                    activeNav === item.href
                      ? "text-[#ccc9c1]"
                      : "text-[#e6e6e6] hover:text-[#ccc9c1]"
                  }
                `}
                onClick={() => setActiveNav(item.href)}
              >
                {item.label}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-0 transition-all duration-200 bg-[#ccc9c1] rounded-full
                    ${activeNav === item.href ? "w-full" : "group-hover:w-full group-focus:w-full hover:w-full"}
                  `}
                  aria-hidden
                  style={{
                    width: activeNav === item.href ? "100%" : undefined,
                    background: "#ccc9c1",
                    height: "3px",
                    transition: "width 0.2s",
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen pt-32 pb-16 z-10"
      >
        <h1
          ref={buildRef}
          className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-[#e6e6e6] drop-shadow-lg mb-2 tracking-tight"
        >
          Build.Automate
        </h1>
        <h2
          ref={analyzeRef}
          className="text-[1.5rem] sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[#ccc9c1] drop-shadow-md mt-2 tracking-tight"
        >
          Analyze.Accelerate
        </h2>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#services"
            className="bg-[#ccc9c1] text-[#142232] font-semibold rounded-full px-8 py-3 text-lg shadow-lg hover:bg-[#e6e6e6] transition-colors duration-200"
          >
            Get started →
          </a>
        </div>
      </section>
      {/* Dummy sections for scroll spy demo */}
      <section id="services" className="min-h-[60vh] bg-transparent pt-32" />
      <section id="projects" className="min-h-[60vh] bg-transparent pt-32" />
      <section id="contact" className="min-h-[60vh] bg-transparent pt-32" />
      <section id="about" className="min-h-[60vh] bg-transparent pt-32" />
    </div>
  );
}
