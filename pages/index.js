import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import {
  motion,
  AnimatePresence,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaDumbbell,
  FaRunning,
  FaSnowflake,
  FaUsers,
  FaBox,
  FaShower,
  FaArrowRight,
} from "react-icons/fa";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [heroZoomComplete, setHeroZoomComplete] = useState(false);
  const [activeTrainer, setActiveTrainer] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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

  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const trainerInterval = setInterval(() => {
      setActiveTrainer((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(trainerInterval);
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

  const faqData = [
    {
      question: "What are your operating hours?",
      answer:
        "We're open 24/7 for all Performance and Elite members. Essential members have access from 5 AM to 11 PM daily.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      question: "Do you offer personal training?",
      answer:
        "Yes, we have over 40 certified personal trainers specializing in various disciplines. All our trainers have extensive experience and certifications.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
    {
      question: "Can I freeze my membership?",
      answer:
        "Yes, you can freeze your membership for up to 3 months per year for medical reasons or travel. A small monthly maintenance fee applies during the freeze period.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      ),
    },
    {
      question: "What's included in the free trial?",
      answer:
        "Our 7-day free trial includes access to all facilities, group classes, and one complimentary personal training session.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          ></path>
        </svg>
      ),
    },
    {
      question: "Do you have nutrition guidance?",
      answer:
        "Yes, all our Performance and Elite members receive personalized nutrition plans. We also offer nutrition workshops and one-on-one consultations with our certified nutritionists.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V5a2 2 0 012-2h14a2 2 0 012 2v10.546z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3"
          ></path>
        </svg>
      ),
    },
  ];

  const facilities = [
    {
      title: "Strength Training Zone",
      image:
        "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?auto=format&fit=crop&w=2091&q=80",
      description:
        "Premium equipment for powerlifting, weight training and functional fitness",
      icon: <FaDumbbell className="text-amber-600 text-xl" />,
      badge: "Relaxation",
    },
    {
      title: "Cardio Theater",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Latest cardio equipment with personal entertainment systems",
      icon: <FaRunning className="text-amber-600 text-xl" />,
      badge: "Premium",
    },
    {
      title: "Recovery Lounge",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1820&q=80",
      description:
        "Cryotherapy, massage chairs and compression therapy for optimal recovery",
      icon: <FaSnowflake className="text-amber-600 text-xl" />,
      badge: "Premium",
    },
    {
      title: "Group Fitness Studio",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2070&q=80",
      description:
        "Spacious studios for yoga, pilates, HIIT and specialized classes",
      icon: <FaUsers className="text-amber-600 text-xl" />,
      badge: "Elite",
    },
    {
      title: "Boxing & MMA Arena",
      image:
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=2069&q=80",
      description: "Professional-grade boxing ring and MMA training equipment",
      icon: <FaBox className="text-amber-600 text-xl" />,
      badge: "Elite",
    },
    {
      title: "Luxury Locker Rooms",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2070&q=80",
      description:
        "Premium amenities including sauna, steam room and towel service",
      icon: <FaShower className="text-amber-600 text-xl" />,
      badge: "Relaxation",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      <Head>
        <title>Elite Performance | Premium Gym & Fitness Experience</title>
        <meta
          name="description"
          content="Experience world-class fitness training at Elite Performance with state-of-the-art facilities and expert trainers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Elements */}

      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-orange-800 opacity-60 blur-[200px] animate-glow1"></div>
        <div className="absolute w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-orange-800 opacity-80 blur-[250px] animate-glow2"></div>
        <div className="absolute w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-red-800 opacity-80 blur-[250px] animate-glow3"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollPosition > 50
            ? "bg-white/80 backdrop-blur-xl shadow-md py-3 md:py-5"
            : "bg-transparent py-4 md:py-6 text-white"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center"
          >
            <h1 className="text-2xl md:text-3xl font-extrabold font-serif tracking-wide">
              <span className="text-amber-900 drop-shadow-[0_0_5px_rgba(255,191,0,0.8)]">
                Elite
              </span>
              <span className="text-amber-700 drop-shadow-[0_0_6px_rgba(139,69,19,0.9)]">
                {" "}
                Performance
              </span>
            </h1>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 lg:space-x-10">
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
                className="relative font-semibold text-base lg:text-lg tracking-wide transition-all group hover:text-[#8B4513] hover:drop-shadow-[0_0_10px_#8B4513]"
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
            <button className="relative overflow-hidden bg-gradient-to-r from-amber-700 to-[#8B4513] text-white font-bold py-2.5 px-6 lg:py-3 lg:px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(139,69,19,0.7)]">
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="md:hidden bg-white/95 backdrop-blur-xl absolute top-full left-0 right-0 shadow-xl border-t border-gray-200/40"
            >
              <div className="flex flex-col space-y-3 p-6">
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
                    className="hover:text-[#8B4513] transition-colors py-2 font-semibold text-base"
                    onClick={() => setIsMenuOpen(false)} // close after click
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-700 to-[#8B4513] text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
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
        id="home"
      >
        {/* Background image with overlay */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-1000 ease-out ${
            heroZoomComplete ? "scale-100" : "scale-125"
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
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
        id="about"
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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
              </motion.div>
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
      <section
        className="py-20 bg-amber-50  relative bg-center bg-no-repeat bg-contain"
        id="about"
        style={{ backgroundImage: "url('/p1.png')" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 p-8 ">
            {/* Left Side */}
            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            {/* Right Side */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-900 font-serif">
                THE ELITE <span className="text-amber-700">DIFFERENCE</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Elite Performance, we've redefined the fitness experience.
                Our philosophy centers on personalized training, cutting-edge
                facilities, and a supportive community that inspires you to push
                beyond your limits.
              </p>

              {/* Features */}
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

              {/* Button */}
              <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md group relative overflow-hidden">
                <span className="relative z-10">LEARN MORE ABOUT US</span>
                <span className="absolute inset-0 bg-amber-800 transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-6 bg-amber-900 text-white overflow-hidden">
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
      <section
        className="py-24 bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden"
        id="training"
      >
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
                  "https://static.vecteezy.com/system/resources/previews/022/993/375/non_2x/a-fitness-trainer-s-battle-at-the-gym-generative-ai-free-photo.jpg",
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
                  "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
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
                  "https://static.vecteezy.com/system/resources/previews/033/880/822/non_2x/back-view-of-young-man-exercising-on-treadmill-in-gym-muscular-bodybuilder-doing-exercises-man-working-on-fitness-machine-at-the-gym-top-section-cropped-ai-generated-free-photo.jpg",
                features: [
                  "Varied Class Types",
                  "Community Atmosphere",
                  "Flexible Scheduling",
                ],
              },
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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
              </motion.div>
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

      {/* Enhanced Trainers Section */}
      <section
        className="py-28 bg-gradient-to-br from-amber-50 to-amber-100/80 relative overflow-hidden"
        id="trainers"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-300/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-600 mr-4"></div>
              <span className="text-amber-700 font-medium tracking-widest uppercase text-sm">
                Elite Training Team
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-600 ml-4"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-amber-900 font-serif tracking-tight">
              WORLD-CLASS{" "}
              <span className="text-amber-700">FITNESS EXPERTS</span>
            </h2>
            <p className="text-xl text-amber-800/90 leading-relaxed max-w-2xl mx-auto">
              Our internationally certified trainers combine decades of
              expertise with cutting-edge techniques to deliver exceptional
              results and transform your fitness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                name: "Marcus Johnson",
                role: "Strength & Conditioning",
                image:
                  "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80",
                specialties: [
                  "Powerlifting",
                  "Athletic Performance",
                  "Functional Training",
                ],
                experience: "15+ years",
                certification: "ISSA Master Trainer",
              },
              {
                name: "Sarah Williams",
                role: "Nutrition & Wellness",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                specialties: [
                  "Nutrition Planning",
                  "Weight Management",
                  "Wellness Coaching",
                ],
                experience: "12+ years",
                certification: "Precision Nutrition L2",
              },
              {
                name: "James Rodriguez",
                role: "Boxing & MMA",
                image:
                  "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
                specialties: ["Boxing", "MMA", "Combat Conditioning"],
                experience: "18+ years",
                certification: "NSCA-CSCS",
              },
              {
                name: "Elena Chen",
                role: "Yoga & Mobility",
                image:
                  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1820&q=80",
                specialties: ["Yoga", "Flexibility", "Injury Prevention"],
                experience: "10+ years",
                certification: "E-RYT 500, YACEP",
              },
            ].map((trainer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group border border-amber-200/50"
              >
                <div className="h-80 overflow-hidden relative">
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-amber-600/90 text-white text-xs font-semibold rounded-full shadow-md">
                      {trainer.experience}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent z-10"></div>
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-5 left-5 z-20">
                    <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                      {trainer.name}
                    </h3>
                    <p className="text-amber-300 font-medium">{trainer.role}</p>
                  </div>
                </div>

                <div className="p-7">
                  <div className="mb-5">
                    <span className="text-xs font-semibold text-amber-700 tracking-wider">
                      {trainer.certification}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-amber-700 mb-3 tracking-wider border-b border-amber-200 pb-2">
                    SPECIALTIES
                  </h4>

                  <ul className="space-y-2 mb-6">
                    {trainer.specialties.map((specialty, i) => (
                      <li
                        key={i}
                        className="flex items-center text-amber-900/90 text-sm"
                      >
                        <svg
                          className="w-4 h-4 text-amber-600 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {specialty}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center group/btn">
                    View Profile
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="px-10 py-4 border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white rounded-lg transition-all duration-300 font-medium tracking-wide transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Explore All Trainers
            </button>
          </div>
        </div>
      </section>
      {/* Membership Plans Section */}
      <section
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
        id="membership"
      >
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-white pattern-size-4"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-0.5 bg-amber-500 mr-4"></div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">
                Exclusive Memberships
              </span>
              <div className="w-12 h-0.5 bg-amber-500 ml-4"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight">
              ELEVATE YOUR <span className="text-amber-400">EXPERIENCE</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Choose from our exclusive membership tiers designed to match your
              fitness goals and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Essential",
                price: "$99",
                period: "per month",
                features: [
                  "Access to all equipment",
                  "Group classes",
                  "Locker room access",
                  "Fitness assessment",
                  "No contract",
                ],
                highlight: false,
              },
              {
                title: "Performance",
                price: "$199",
                period: "per month",
                features: [
                  "All Essential benefits",
                  "Personal training sessions",
                  "Nutrition planning",
                  "Recovery services",
                  "Priority booking",
                  "24/7 access",
                ],
                highlight: true,
              },
              {
                title: "Elite",
                price: "$299",
                period: "per month",
                features: [
                  "All Performance benefits",
                  "Unlimited personal training",
                  "Advanced body composition",
                  "Cryotherapy & recovery",
                  "VIP locker",
                  "Supplement guidance",
                  "Exclusive events",
                ],
                highlight: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-b ${
                  plan.highlight
                    ? "from-amber-600 to-amber-800 scale-105"
                    : "from-gray-800 to-gray-900"
                } rounded-3xl p-8 relative overflow-hidden transform transition-all duration-500 hover:scale-105`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-amber-900 text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-300">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-amber-500 mr-3"
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
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                    plan.highlight
                      ? "bg-white text-amber-700 hover:bg-amber-100"
                      : "bg-amber-600 text-white hover:bg-amber-700"
                  }`}
                >
                  SELECT PLAN
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section
        className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
        id="facilities"
        style={{
          backgroundImage: "url('/smoke3.png'), url('/smoke4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-700/5 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-8 md:w-12 h-0.5 bg-amber-400 mr-4"></div>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm drop-shadow-lg [text-shadow:_0_0_6px_rgba(255,255,255,0.8),_2px_2px_6px_rgba(0,0,0,0.9)] [paint-order:stroke_fill] [stroke:1px_white]">
                World-Class Facilities
              </span>
              <div className="w-8 md:w-12 h-0.5 bg-amber-400 ml-4"></div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-serif tracking-tight drop-shadow-xl [text-shadow:_0_0_10px_rgba(255,255,255,0.8),_2px_2px_6px_rgba(0,0,0,0.9)] [paint-order:stroke_fill] [stroke:1px_white]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              PREMIUM{" "}
              <span className="text-amber-400 glow-amber drop-shadow-lg [paint-order:stroke_fill] [stroke:1px_white]">
                TRAINING
              </span>{" "}
              ENVIRONMENT
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white leading-relaxed drop-shadow-md [text-shadow:_0_0_6px_rgba(255,255,255,0.7),_1px_1px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our state-of-the-art facilities are designed to provide the
              perfect environment for achieving your fitness goals.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -15,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 bg-white border border-white/20 relative shine-effect"
              >
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 pointer-events-none z-10"></div>
                <div className="absolute top-4 left-4 w-24 h-24 bg-amber-400/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

                {/* Image container */}
                <div className="h-72 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>

                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />

                  {/* Premium icon badge */}
                  <div className="absolute top-5 right-5 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-20">
                    <div className="text-white text-2xl">{facility.icon}</div>
                  </div>

                  {/* Premium ribbon badge */}
                  <div className="absolute top-5 left-0 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs font-bold px-4 py-2 shadow-lg z-20 uppercase tracking-wider">
                    {facility.badge}
                  </div>

                  {/* Hover title overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-center opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 z-20">
                    <h3 className="text-2xl font-bold text-white mb-3 font-playfair">
                      {facility.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* Content container */}
                <div className="p-7 bg-gradient-to-b from-white to-slate-50 relative">
                  {/* Decorative top element */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rotate-45 rounded-sm shadow-lg"></div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-amber-700 transition-colors duration-500 font-playfair">
                    {facility.title}
                  </h3>

                  <p className="text-gray-600 text-center leading-relaxed text-sm mb-5 font-light">
                    {facility.description}
                  </p>

                  {/* CTA button */}
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-700 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    >
                      <span className="mr-2">Explore Facility</span>
                      <svg
                        className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* View All Button */}
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="px-6 py-3 md:px-8 md:py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-colors duration-300 shadow-md hover:shadow-lg text-sm md:text-base"></button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="relative py-20 overflow-hidden"
        id="faq"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(253, 230, 138, 0.15), rgba(254, 243, 199, 0.1)), radial-gradient(ellipse at bottom, rgba(251, 191, 36, 0.2), rgba(254, 243, 199, 0.1))",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-amber-500/10 to-amber-600/10 transform -skew-y-3 origin-top-left"></div>

        <div className="absolute top-20 -left-20 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slower"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center mb-6 bg-amber-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-amber-100/30"
            >
              <div className="w-12 h-0.5 bg-amber-600 mr-3"></div>
              <span className="text-amber-700 font-medium tracking-wider uppercase text-xs">
                Frequently Asked Questions
              </span>
              <div className="w-12 h-0.5 bg-amber-600 ml-3"></div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900 font-serif tracking-tight">
              Your Questions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                Answered
              </span>
            </h2>
            <p className="text-lg text-amber-700/80 leading-relaxed">
              Find answers to the most frequently asked questions about our
              premium facilities, memberships, and training programs.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.005,
                    boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.15)",
                  }}
                  className={`flex items-start w-full p-6 text-left rounded-xl transition-all duration-300 backdrop-blur-sm ${
                    activeFaq === index
                      ? "bg-amber-50/80 shadow-lg border border-amber-200/50"
                      : "bg-white/70 hover:bg-amber-50/60 shadow-sm border border-amber-100/30"
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex-shrink-0 mr-4 text-amber-700 mt-0.5 bg-amber-100/70 p-2 rounded-lg">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900 text-lg">
                      {faq.question}
                    </h3>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-amber-700/80 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 text-amber-700"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-to-r from-amber-700 to-amber-900 text-white relative overflow-hidden"
        id="contact"
      >
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
                {["facebook", "instagram", "twitter", "youtube"].map(
                  (social) => (
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
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-200">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#training"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Training Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#membership"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#facilities"
                    className="text-amber-100 hover:text-amber-200 transition-colors"
                  >
                    Facilities
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
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
      @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');


            @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 12px rgba(255,193,7,0.7), 2px 2px 6px rgba(0,0,0,0.9);
          }
          50% {
            text-shadow: 0 0 24px rgba(255,193,7,1), 2px 2px 8px rgba(0,0,0,1);
          }
        }
        .glow-amber {
          animation: pulse-glow 2s infinite;
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .shine-effect:after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 20%;
          height: 200%;
          background: rgba(255, 255, 255, 0.13);
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.13) 0%,
            rgba(255, 255, 255, 0.13) 77%,
            rgba(255, 255, 255, 0.5) 92%,
            rgba(255, 255, 255, 0.0) 100%
          );
          transform: rotate(30deg);
          transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
          pointer-events: none;
        }
        
        .shine-effect:hover:after {
          left: 130%;
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

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
          }
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        // glow
        @keyframes float1 {
          0% {
            transform: translateX(20%) translateY(0);
          }
          50% {
            transform: translateX(-20%) translateY(-10%);
          }
          100% {
            transform: translateX(20%) translateY(0);
          }
        }

        @keyframes float2 {
          0% {
            transform: translateX(-20%) translateY(10%);
          }
          50% {
            transform: translateX(20%) translateY(-10%);
          }
          100% {
            transform: translateX(-20%) translateY(10%);
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

        /* Marquee Scrolling */
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
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

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.9;
          }
        }
        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
