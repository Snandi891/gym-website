// HeroSection.js
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden text-white">
      {/* Background Glow Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Orange Glow 1 */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-800 opacity-60 blur-[200px] animate-glow1"></div>
        {/* Orange Glow 2 */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-800 opacity-80 blur-[300px] animate-glow2"></div>
        {/* Red Glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-red-800 opacity-80 blur-[300px] animate-glow3"></div>
      </div>

      {/* Tailwind + Custom Animations */}
      <style jsx>{`
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
    </section>
  );
}
