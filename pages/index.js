import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence, useSpring, useScroll } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [heroZoomComplete, setHeroZoomComplete] = useState(false);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Trigger hero zoom effect once on component mount
    const timer = setTimeout(() => {
      setHeroZoomComplete(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // Animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Scroll Progress Bar */}

      <Head>
        <title>Elite Performance | Premium Gym & Fitness Experience</title>
        <meta
          name="description"
          content="Experience world-class fitness training at Elite Performance with state-of-the-art facilities and expert trainers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollPosition > 50
            ? "bg-white/80 backdrop-blur-xl shadow-md py-3 md:py-5"
            : "bg-transparent py-5 md:py-7 text-white"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold font-serif tracking-wide">
              <span className="text-amber-900 drop-shadow-[0_0_5px_rgba(255,191,0,0.8)]">
                Elite
              </span>
              <span className="text-amber-700 drop-shadow-[0_0_6px_rgba(139,69,19,0.9)]">
                Performance
              </span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {[
              "Home",
              "About",
              "Training",
              "Membership",
              "Facilities",
              "Contact",
            ].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="relative font-semibold text-lg tracking-wide transition-all group 
             hover:text-[#8B4513] hover:drop-shadow-[0_0_10px_#8B4513]"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#8B4513] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center"
          >
            <button className="relative overflow-hidden bg-gradient-to-r from-amber-700 to-[#8B4513] text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(139,69,19,0.7)]">
              <span className="relative z-10">Join Now</span>
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="md:hidden bg-white/90 backdrop-blur-xl absolute top-full left-0 right-0 shadow-xl border-t border-gray-200/40"
            >
              <div className="flex flex-col space-y-4 p-6">
                {[
                  "Home",
                  "About",
                  "Training",
                  "Membership",
                  "Facilities",
                  "Contact",
                ].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="hover:text-[#8B4513] transition-colors py-2 font-semibold text-lg"
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-amber-700 to-[#8B4513] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Join Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        ref={heroRef}
      >
        {/* Background image with overlay */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-1000 ease-out ${
            heroZoomComplete ? "scale-100" : "scale-125"
          }`}
          style={{
            backgroundImage:
              "url('data:image/jpeg;base64,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')",
          }}
        />

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 z-10"></div>

        {/* 🔥 Glowing Layers */}

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-30 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 md:mb-6">
              <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4 animate-pulse">
                PREMIUM FITNESS EXPERIENCE
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight font-serif px-2">
              REDEFINE YOUR{" "}
              <span className="text-amber-300 block mt-2 md:mt-0 md:inline">
                POTENTIAL
              </span>
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 text-amber-100 max-w-2xl mx-auto leading-relaxed px-4">
              Where world-class facilities meet expert training to transform
              your fitness journey
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-full text-base md:text-lg transition-all transform hover:scale-105 duration-300 shadow-lg flex items-center justify-center group relative overflow-hidden w-full sm:w-auto">
                <span className="relative z-10">START FREE TRIAL</span>
                <svg
                  className="w-5 h-5 ml-2 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
                <span className="absolute inset-0 bg-amber-600 transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>

              <button className="border-2 border-white text-white hover:bg-white hover:text-amber-800 font-bold py-3 md:py-4 px-6 md:px-10 rounded-full text-base md:text-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden w-full sm:w-auto">
                <span className="relative z-10">WATCH VIDEO</span>
                <svg
                  className="w-5 h-5 ml-2 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="absolute inset-0 bg-white transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-24 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            ></div>
          ))}

          {/* Animated gradient blobs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-300/20 rounded-full animate-pulse-slow blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-amber-400/20 rounded-full animate-pulse-medium blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-500/15 rounded-full animate-pulse-slow blur-3xl"></div>
        </div>

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pattern-dots pattern-amber-500 pattern-size-4"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-0.5 bg-amber-600 mr-4"></div>
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-sm">
                PROVEN EXCELLENCE
              </span>
              <div className="w-12 h-0.5 bg-amber-600 ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 font-serif tracking-tight">
              WHY THOUSANDS
              <span className="block text-amber-700 mt-2">CHOOSE US</span>
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed">
              For over a decade, we've been transforming lives through fitness
              innovation and personalized training approaches that deliver real
              results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "15+",
                text: "Years Experience",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                number: "5000+",
                text: "Members Transformed",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                number: "40+",
                text: "Expert Trainers",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
              {
                number: "24/7",
                text: "Open Access",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 group relative overflow-hidden border border-amber-100 shadow-lg hover:shadow-xl"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl p-ply bg-gradient-to-r from-amber-400/0 via-amber-500/50 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon container */}
                <div className="relative z-10 flex justify-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-300 shadow-inner">
                    <div className="text-amber-700 group-hover:text-amber-900 transition-colors duration-300">
                      {stat.icon}
                    </div>
                  </div>
                </div>

                {/* Number */}
                <div className="relative z-10">
                  <div
                    className={`text-5xl md:text-6xl font-bold text-amber-900 mb-2 ${
                      isVisible ? "animate-count" : ""
                    }`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-700 group-hover:text-amber-800 transition-colors duration-300 font-medium tracking-wide">
                    {stat.text}
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <button className="relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                JOIN OUR COMMUNITY
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

              {/* Button shine effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
            </button>

            <p className="text-amber-700 mt-8 flex items-center justify-center text-sm">
              <svg
                className="w-5 h-5 text-amber-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              Trusted by thousands worldwide since 2008
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <video
                  src="/video/video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white p-6 rounded-2xl shadow-xl transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-900 font-serif">
                THE ELITE <span className="text-amber-700">DIFFERENCE</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Elite Performance, we've redefined the fitness experience.
                Our philosophy centers on personalized training, cutting-edge
                facilities, and a supportive community that inspires you to push
                beyond your limits.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Bespoke Training Programs",
                    desc: "Customized workouts tailored to your specific goals and abilities",
                  },
                  {
                    title: "Recovery & Wellness Center",
                    desc: "Comprehensive recovery facilities including cryotherapy and massage",
                  },
                  {
                    title: "Nutrition Planning",
                    desc: "Expert dietary guidance to complement your training regimen",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="bg-amber-100 p-2 rounded-full mr-4 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md group relative overflow-hidden">
                <span className="relative z-10">LEARN MORE ABOUT US</span>
                <span className="absolute inset-0 bg-amber-800 transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-slate-900 text-white overflow-hidden">
        <div className="relative">
          <div className="whitespace-nowrap flex gap-12 animate-marquee pause-on-hover">
            {/* Repeat the text blocks as needed to make the loop seamless */}
            <span className="text-lg font-semibold">
              🔥 SPECIAL OFFER — 50% OFF MEMBERSHIPS
            </span>
            <span className="text-lg font-semibold">
              NEW TRAINING SESSIONS — BOOK NOW
            </span>
            <span className="text-lg font-semibold">
              FREE NUTRITION CONSULTATION
            </span>
            <span className="text-lg font-semibold">
              JOIN THE ELITE COMMUNITY
            </span>

            {/* Duplicate again so the animation can loop smoothly */}
            <span className="text-lg font-semibold">
              🔥 SPECIAL OFFER — 50% OFF MEMBERSHIPS
            </span>
            <span className="text-lg font-semibold">
              NEW TRAINING SESSIONS — BOOK NOW
            </span>
            <span className="text-lg font-semibold">
              FREE NUTRITION CONSULTATION
            </span>
            <span className="text-lg font-semibold">
              JOIN THE ELITE COMMUNITY
            </span>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-amber-200/20 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-300/10 rounded-full"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-400/10 rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-0.5 bg-amber-600 mr-4"></div>
              <span className="text-amber-700 font-semibold tracking-wider uppercase text-sm">
                Our Offerings
              </span>
              <div className="w-12 h-0.5 bg-amber-600 ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 font-serif tracking-tight">
              WORLD-CLASS{" "}
              <span className="text-amber-700 relative inline-block">
                TRAINING PROGRAMS
                <svg
                  className="absolute -bottom-2 left-0 w-full text-amber-500"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 C30,10 70,10 100,0 L100,10 L0,10 Z"
                    fill="currentColor"
                    opacity="0.2"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our diverse range of programs is meticulously designed to meet
              every fitness goal, whether you're taking your first steps or
              chasing elite performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Strength & Conditioning",
                desc: "Build functional strength and power with our expert-led programs",
                price: "$199/month",
                image:
                  "data:image/jpeg;base64,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",
                features: [
                  "Customized Plans",
                  "Progressive Overload",
                  "Recovery Guidance",
                ],
              },
              {
                title: "1-on-1 Personal Training",
                desc: "Get personalized attention with our certified expert trainers",
                price: "$299/month",
                image:
                  "data:image/jpeg;base64,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",
                features: [
                  "Tailored Workouts",
                  "Nutrition Planning",
                  "24/7 Support",
                ],
              },
              {
                title: "Group Fitness",
                desc: "Motivating group classes from HIIT to yoga and everything between",
                price: "$149/month",
                image:
                  "data:image/jpeg;base64,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",
                features: [
                  "Varied Class Types",
                  "Community Atmosphere",
                  "Flexible Scheduling",
                ],
              },
            ].map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 group relative"
              >
                <div className="relative overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-amber-900 group-hover:text-amber-700 transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {program.desc}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2">
                      PROGRAM INCLUDES:
                    </h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 text-amber-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-amber-100">
                    <div>
                      <span className="text-amber-700 font-bold text-xl">
                        {program.price}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        No initiation fee
                      </span>
                    </div>
                    <button className="bg-amber-100 hover:bg-amber-700 text-amber-700 hover:text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 flex items-center group/btn">
                      Explore
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
              <span className="relative z-10 flex items-center justify-center">
                VIEW ALL PROGRAMS
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <p className="text-gray-600 mt-8 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-amber-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              All programs include a 14-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              SUCCESS <span className="text-amber-200">STORIES</span>
            </h2>
            <p className="text-lg text-amber-100">
              Hear from our members who have transformed their lives with Elite
              Performance
            </p>
          </div>

          {/* Testimonials */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 overflow-hidden">
              {[
                {
                  name: "Michael Chen",
                  tenure: "Member for 3 years",
                  text: "Elite Performance transformed my approach to fitness. The trainers' expertise and the community support helped me lose 40lbs and complete my first marathon.",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=774&q=80",
                },
                {
                  name: "Sarah Johnson",
                  tenure: "Member for 2 years",
                  text: "The personalized nutrition plan and strength training program helped me build muscle and confidence. I've never felt stronger or more empowered!",
                  image:
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=776&q=80",
                },
                {
                  name: "David Rodriguez",
                  tenure: "Member for 4 years",
                  text: "After my injury, the trainers at Elite Performance created a rehab program that got me back to competing. Their knowledge and support were incredible.",
                  image:
                    "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=798&q=80",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ease-in-out ${
                    activeTestimonial === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-200 shadow-lg ring-4 ring-amber-700/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Quote */}
                  <p className="text-xl md:text-2xl italic mb-6 leading-relaxed max-w-2xl mx-auto text-amber-50">
                    “{testimonial.text}”
                  </p>
                  {/* Name */}
                  <h4 className="font-bold text-amber-200 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-amber-100 text-sm">{testimonial.tenure}</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-3 mt-10">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-amber-200 scale-110 shadow-md"
                      : "bg-amber-200/40 hover:bg-amber-200/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-amber-500 pattern-size-4 pattern-opacity-100"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              READY TO{" "}
              <span className="text-amber-200">ELEVATE YOUR FITNESS</span>{" "}
              JOURNEY?
            </h2>
            <p className="text-xl mb-10 text-amber-100">
              Join today and experience the Elite Performance difference with a
              complimentary 7-day trial
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-amber-100 text-amber-800 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg group relative overflow-hidden">
                <span className="relative z-10">START FREE TRIAL</span>
                <span className="absolute inset-0 bg-amber-100 transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-amber-800 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 group relative overflow-hidden">
                <span className="relative z-10">SCHEDULE A TOUR</span>
                <span className="absolute inset-0 bg-white transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-200 mb-4 font-serif">
                Elite<span className="text-white">Performance</span>
              </h3>
              <p className="text-amber-100 mb-6">
                Transforming lives through excellence in fitness since 2008.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-amber-100 hover:text-amber-200 transition-colors bg-amber-900 p-2 rounded-full transform hover:scale-110 duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-200">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Training Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Facilities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-200">Hours</h4>
              <ul className="space-y-2 text-amber-100">
                <li>Monday-Friday: 5am - 11pm</li>
                <li>Saturday: 7am - 9pm</li>
                <li>Sunday: 8am - 8pm</li>
                <li className="pt-4">Holiday hours may vary</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-200">Contact</h4>
              <ul className="space-y-2 text-amber-100">
                <li>123 Fitness Avenue, Athletic City</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@eliteperformance.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-12 pt-8 text-center text-amber-200">
            <p>
              &copy; {new Date().getFullYear()} Elite Performance. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* Fade In */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 1.5s ease-out forwards;
        }

        /* Slide Down */
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 1s ease-out forwards;
        }

        /* Fade In Left */
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
        }

        /* Fade In Up */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        /* Bounce (Custom, avoid Tailwind conflict) */
        @keyframes bounceCustom {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-custom {
          animation: bounceCustom 2s infinite;
        }

        /* Pulse (Custom, avoid Tailwind conflict) */
        @keyframes pulseCustom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pulse-fast {
          animation: pulseCustom 1s infinite;
        }
        .animate-pulse-medium {
          animation: pulseCustom 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulseCustom 3s infinite;
        }

        /* Floating Effects */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Glow Floating (Hero background circles) */
        @keyframes float1 {
          0% {
            transform: translateX(100%) translateY(0);
          }
          50% {
            transform: translateX(-40%) translateY(-10%);
          }
          100% {
            transform: translateX(100%) translateY(0);
          }
        }
        @keyframes float2 {
          0% {
            transform: translateX(-100%) translateY(10%);
          }
          50% {
            transform: translateX(40%) translateY(-20%);
          }
          100% {
            transform: translateX(-100%) translateY(10%);
          }
        }
        .animate-glow1 {
          animation: float1 6s ease-in-out infinite alternate;
        }
        .animate-glow2 {
          animation: float2 8s ease-in-out infinite alternate;
        }

        /* Counter / Number Count */
        @keyframes count {
          from {
            content: "0";
          }
        }
        .counter::before {
          animation: count 2s steps(100) forwards;
          counter-reset: num var(--target);
          content: counter(num);
        }

        /* Glow Pulse */
        @keyframes glowPulse {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
        }
        .animate-glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* ===============================
   SECTION BACKGROUND UTILITIES
================================= */

        /* Dotted Pattern */
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.1;
        }

        /* Marquee Scrolling */
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee {
          display: flex;
          width: 200%;
          animation: marquee 15s linear infinite;
        }
        .marquee > div {
          display: flex;
          gap: 2rem;
        }
      `}</style>
    </div>
  );
}
