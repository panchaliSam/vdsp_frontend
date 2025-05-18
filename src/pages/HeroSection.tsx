import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import HeroSectionImageJpg from "@app_assets/HeroSection/HeroSection.jpg";

const kineticTagline = [
  "Capturing Stories",
  "in Every Frame"
];

// Use Picsum for all showcase images as mock
const categories = [
  { id: 1, title: 'Wedding Bliss', img: 'https://picsum.photos/seed/wedding/800/450' },
  { id: 2, title: 'Engagement', img: 'https://picsum.photos/seed/engagement/800/450' },
  { id: 3, title: 'Birthday Bash', img: 'https://picsum.photos/seed/birthday/800/450' },
  { id: 4, title: 'Graduation Day', img: 'https://picsum.photos/seed/graduation/800/450' },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const taglineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const spans = taglineRef.current?.querySelectorAll('span');
    if (spans) {
      spans.forEach((span, i) => {
        span.animate([
          { opacity: 0, transform: 'translateY(40px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 600,
          delay: i * 180,
          fill: 'forwards',
          easing: 'cubic-bezier(.5,1.5,.5,1)'
        });
      });
    }
  }, []);

  const handleSignIn = () => navigate("/login");
  const handleGallery = () => navigate("/gallery");

  // Duplicate categories for seamless animation
  const animatedCategories = [...categories, ...categories];

  return (
    <div className="relative min-h-screen w-full font-urbanist flex flex-col items-center justify-center overflow-hidden hero">
      {/* Fixed, always visible hero background image */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <img
          src={HeroSectionImageJpg}
          alt="Lens Macro Hero"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          style={{ minHeight: '100vh' }}
          loading="eager"
          draggable={false}
        />
      </div>

      {/* Frosted Navigation */}
      <header className="fixed inset-x-0 top-4 z-40 flex justify-between items-center mx-auto w-[min(92%,1280px)] px-6 py-3 backdrop-blur-xl bg-night/60 ring-1 ring-white/8 rounded-3xl">
        <div className="flex-1 flex justify-center">
          <img src={Logo} alt="Lenxlens" className="h-12" />
        </div>
        <button
          onClick={handleSignIn}
          className="px-6 py-2 rounded-full font-medium shadow-lg transition-all bg-[#f7d501] text-white hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d501]/70"
        >
          Sign In
        </button>
      </header>

      {/* Main Content Block, centered and viewport-fit */}
      <main className="relative z-20 flex flex-col items-center justify-center w-full flex-1 pt-40 pb-16 px-4 md:px-0 min-h-[60vh]">
        <h1
          ref={taglineRef}
          className="font-playfair text-[clamp(2.5rem,7vw,6rem)] leading-[1.1] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,.7)] text-center"
          aria-label="Capturing Stories in Every Frame"
        >
          {kineticTagline.map((line, i) => (
            <span key={i} className="block">{line}{i === 0 && <br className="md:hidden" />}</span>
          ))}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white text-center">
          Welcome to <span className="relative" style={{ color: '#f7d501' }}>
            Vidura De Silva Photography
            <span className="absolute -bottom-2 left-0 w-full h-[3px]" style={{ backgroundColor: '#f7d501', opacity: 0.8, borderRadius: '9999px' }}></span>
          </span>, a professional studio.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={handleGallery}
            className="cta-solid focus-ring-cyan motion-safe:active:scale-95"
            aria-label="View Gallery"
            style={{ background: 'rgba(247, 213, 1, 0.2)' }}
          >
            View Gallery
          </button>
          <button
            onClick={handleSignIn}
            className="cta-ghost focus-ring-cyan motion-safe:active:scale-95"
            aria-label="Book a Session"
          >
            Book a Session
          </button>
        </div>
      </main>

      {/* Endless Animated Showcase Carousel */}
      <section className="relative z-30 w-full flex justify-center items-center min-h-[260px]">
        <div className="w-full max-w-7xl overflow-hidden">
          <ul
            className="flex gap-8 animate-marquee"
            style={{
              animation: 'marquee 32s linear infinite',
              willChange: 'transform',
            }}
          >
            {animatedCategories.map((c, idx) => (
              <li key={c.id + '-' + idx} className="w-[280px] shrink-0">
                <figure className="group perspective-1000">
                  <img src={c.img} alt={c.title}
                    className="rounded-2xl h-44 w-full object-cover transition-transform duration-300 group-hover:rotate-[3deg] group-hover:scale-105 motion-safe:transition-transform shadow-tagline" />
                  <figcaption className="mt-3 text-center font-medium text-white text-lg drop-shadow-tagline">{c.title}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 32s linear infinite;
          }
          /* Hide horizontal scrollbar */
          .max-w-7xl::-webkit-scrollbar, .w-full::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </div>
  );
};

export default HeroSection;