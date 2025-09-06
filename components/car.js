import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Slides data
const roadsterFloorImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/roadster-floor.png";
const roadsterImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/roadster-car.png";
const truckFloorImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/truck-floor.png";
const truckImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/truck-car.png";

const slides = [
  {
    id: 1,
    name: "Model S",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
    color: "#0047fd",
    imgFloorUrl: truckFloorImg,
    imgUrl: truckImg,
    topSpeed: 75,
    mph: 4.5,
    mileRange: 400,
    bckgHeight: 300,
    carShadowHeight: 300,
    shadowOpacity: 0.2,
  },
  {
    id: 2,
    name: "Model X",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    color: "#ee0101",
    imgFloorUrl: roadsterFloorImg,
    imgUrl: roadsterImg,
    topSpeed: 255,
    mph: 3,
    mileRange: 520,
    bckgHeight: 250,
    carShadowHeight: 0,
    shadowOpacity: 0.5,
  },
  {
    id: 3,
    name: "Model 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
    color: "#0047fd",
    imgFloorUrl: truckFloorImg,
    imgUrl: truckImg,
    topSpeed: 55,
    mph: 6,
    mileRange: 550,
    bckgHeight: 300,
    carShadowHeight: 250,
    shadowOpacity: 0.2,
  },
  {
    id: 4,
    name: "Roadster",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    color: "#ee0101",
    imgFloorUrl: roadsterFloorImg,
    imgUrl: roadsterImg,
    topSpeed: 250,
    mph: 1.9,
    mileRange: 620,
    bckgHeight: 340,
    carShadowHeight: 150,
    shadowOpacity: 0.5,
  },
  {
    id: 5,
    name: "Semi truck",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    color: "#0047fd",
    imgFloorUrl: truckFloorImg,
    imgUrl: truckImg,
    topSpeed: 65,
    mph: 5,
    mileRange: 500,
    bckgHeight: 390,
    carShadowHeight: 400,
    shadowOpacity: 0.2,
  },
];

// Set CSS Variables
const SetCSSVariables = ({ cssVariables, children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.keys(cssVariables).forEach(function (key) {
        document.documentElement.style.setProperty(key, cssVariables[key]);
      });
    }
  }, [cssVariables]);

  return children;
};

// Animation function
function animate(render, duration, easing, next = () => null) {
  const start = Date.now();

  (function loop() {
    const current = Date.now();
    const delta = current - start;
    const step = delta / duration;

    if (step > 1) {
      render(1);
      next();
    } else {
      requestAnimationFrame(loop);
      render(easing(step * 2));
    }
  })();
}

// AnimValue Component with refs instead of findDOMNode
const AnimValue = ({
  className,
  value,
  delay = 0,
  duration = 800,
  transformFn = (val) => Math.floor(val),
}) => {
  const nodeRef = useRef(null);
  const timeoutRef = useRef(null);

  const setValue = (value, step) => {
    if (!nodeRef.current) return;

    if (step === 1) {
      nodeRef.current.style.opacity = 1;
    } else {
      nodeRef.current.style.opacity = 0.7;
    }

    nodeRef.current.textContent = value;
  };

  useEffect(() => {
    const startValue = 0;
    const diff = value - startValue;

    const renderFunction = (step) => {
      timeoutRef.current = setTimeout(() => {
        setValue(transformFn(startValue + diff * step, step), step);
      }, delay);
    };

    animate(renderFunction, duration, (t) => t); // Using linear easing for simplicity

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, duration, transformFn]);

  return (
    <span className={className} ref={nodeRef}>
      0
    </span>
  );
};

// AnimateValue Component
const AnimateValue = ({ className, value, delay }) => {
  return (
    <AnimValue
      className={className}
      delay={delay}
      value={value}
      transformFn={(value, step) =>
        step === 1
          ? value % 1 !== 0
            ? value.toFixed(1)
            : value
          : Math.abs(Math.floor(value))
      }
    />
  );
};

// Slide Aside Component
const SlideAside = ({ activeCar }) => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  return (
    <div className="tesla-slide-aside">
      <h1 className="tesla-slide-aside__wholename">
        <span>Tesla</span>
        <TransitionGroup component="span" className="tesla-slide-aside__name">
          <CSSTransition
            key={activeCar.name}
            timeout={{ enter: 800, exit: 1000 }}
            classNames="tesla-slide-aside__name-part-"
            mountOnEnter
            unmountOnExit
            nodeRef={nameRef}
          >
            <span ref={nameRef}>{activeCar.name}</span>
          </CSSTransition>
        </TransitionGroup>
      </h1>

      <TransitionGroup className="tesla-slide-aside__desc">
        <CSSTransition
          key={activeCar.desc}
          timeout={{ enter: 900, exit: 1200 }}
          classNames="tesla-slide-aside__desc-text-"
          mountOnEnter
          unmountOnExit
          nodeRef={descRef}
        >
          <p ref={descRef}>{activeCar.desc}</p>
        </CSSTransition>
      </TransitionGroup>

      <div className="tesla-slide-aside__button">
        <button className="button">Reserve now</button>
        <TransitionGroup>
          <CSSTransition
            key={activeCar.color}
            timeout={{ enter: 800, exit: 1000 }}
            mountOnEnter
            unmountOnExit
            classNames="button__border-"
            nodeRef={buttonRef}
          >
            <SetCSSVariables cssVariables={{ "--btn-color": activeCar.color }}>
              <span ref={buttonRef} className="button__border"></span>
            </SetCSSVariables>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

// SlideParams Component
const SlideParams = ({ activeCar, animationForward }) => {
  const [delays, setDelays] = useState({
    topSpeed: 200,
    mph: 700,
    mileRange: 1200,
  });

  useEffect(() => {
    if (!animationForward) {
      setDelays({ topSpeed: 1200, mph: 700, mileRange: 200 });
    } else {
      setDelays({ topSpeed: 200, mph: 700, mileRange: 1200 });
    }
  }, [animationForward]);

  return (
    <div className="tesla-slide-params">
      <ul className="tesla-slide-params__list">
        <li className="tesla-slide-params__item">
          <div className="tesla-slide-params__wrapper">
            <span className="tesla-slide-params__prefix">+</span>
            <AnimateValue
              className="tesla-slide-params__value"
              value={activeCar.topSpeed}
              delay={delays.topSpeed}
            />
            <span className="tesla-slide-params__sufix">mph</span>
          </div>
          <p className="tesla-slide-params__name">Top speed</p>
        </li>

        <li className="tesla-slide-params__item">
          <div className="tesla-slide-params__wrapper">
            <AnimateValue
              className="tesla-slide-params__value"
              value={activeCar.mph}
              delay={delays.mph}
            />
            <span className="tesla-slide-params__sufix">s</span>
          </div>
          <p className="tesla-slide-params__name">0-60 mph</p>
        </li>

        <li className="tesla-slide-params__item">
          <div className="tesla-slide-params__wrapper">
            <AnimateValue
              className="tesla-slide-params__value"
              value={activeCar.mileRange}
              delay={delays.mileRange}
            />
            <span className="tesla-slide-params__sufix">mi</span>
          </div>
          <p className="tesla-slide-params__name">Mile Range</p>
        </li>
      </ul>
    </div>
  );
};

// Slide Component
const ANIMATION_PHASES = {
  PENDING: "PENDING",
  STOP: "STOP",
};

const Slide = ({ activeSlide, animationForward, setAnimationState }) => {
  const bckgRef = useRef(null);
  const imgRef = useRef(null);

  const handleEnter = () => {
    setAnimationState(ANIMATION_PHASES.STOP);
  };

  return (
    <div
      className={`tesla-slide ${
        animationForward ? "animation-forward" : "animation-back"
      }`}
    >
      <SlideAside activeCar={activeSlide} />

      <TransitionGroup>
        <CSSTransition
          key={activeSlide.name}
          timeout={{ enter: 800, exit: 1000 }}
          classNames="tesla-slide__bckg-"
          mountOnEnter
          unmountOnExit
          nodeRef={bckgRef}
        >
          <SetCSSVariables
            cssVariables={{
              "--car-color": activeSlide.color,
              "--bckg-height": activeSlide.bckgHeight + "px",
              "--shadow-opacity": activeSlide.shadowOpacity,
              "--car-shadow-height": activeSlide.carShadowHeight + "px",
            }}
          >
            <div ref={bckgRef} className="tesla-slide__bckg">
              <div className="tesla-slide__bckg-fill"></div>
            </div>
          </SetCSSVariables>
        </CSSTransition>
      </TransitionGroup>

      <TransitionGroup>
        <CSSTransition
          key={activeSlide.name}
          timeout={{ enter: 700, exit: 1200 }}
          classNames="tesla-slide__img-"
          mountOnEnter
          unmountOnExit
          onEntered={handleEnter}
          nodeRef={imgRef}
        >
          <div ref={imgRef} className="tesla-slide__img">
            <img
              className="tesla-slide__img-floor"
              src={activeSlide.imgFloorUrl}
              alt=""
            />
            <img
              className="tesla-slide__img-car"
              src={activeSlide.imgUrl}
              alt=""
            />
          </div>
        </CSSTransition>
      </TransitionGroup>

      <SlideParams
        activeCar={activeSlide}
        animationForward={animationForward}
      />
    </div>
  );
};

// SliderNavigation Component
const logoTesla =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/logoTesla.svg";
const mouseImg =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/mouse.svg";
const hamburger =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1780138/hamburger.svg";

const SliderNavigation = ({ activeSlide, setActiveSlide, carsNames }) => {
  return (
    <div className="tesla-slider-navigation">
      <ul className="tesla-slider-navigation__list">
        {carsNames.map((car) => (
          <li key={car.id} className="tesla-slider-navigation__item">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setActiveSlide(carsNames.indexOf(car));
              }}
              className={`tesla-slider-navigation__link ${
                carsNames[activeSlide] === car
                  ? "tesla-slider-navigation__link--active"
                  : ""
              }`}
              style={{
                color: carsNames[activeSlide] === car ? car.color : "",
              }}
            >
              {car.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="tesla-header">
      <div className="tesla-header__logo">
        <img src={logoTesla} alt="Tesla" />
      </div>
      <div className="tesla-header__nav">
        <img src={hamburger} alt="Menu" />
      </div>
    </div>
  );
};

// Slider Component
const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(3);
  const [animationForward, setAnimationForward] = useState(true);
  const [animationState, setAnimationState] = useState(null);
  const timeoutRef = useRef(null);
  const sliderRef = useRef({
    header: null,
    content: null,
  });

  const setActiveSlideHandler = (slideId) => {
    setAnimationForward(activeSlide < slideId);
    setActiveSlide(slideId);
    setAnimationState(ANIMATION_PHASES.PENDING);
  };

  const handleScroll = (e) => {
    if (typeof window === "undefined") return;

    const sliderHeight = sliderRef.current.content?.clientHeight || 0;
    const headerHeight = sliderRef.current.header?.clientHeight || 0;

    if (window.innerHeight < sliderHeight + headerHeight) {
      return;
    }

    e.preventDefault();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (e.deltaY < 0 && activeSlide !== 0) {
        setActiveSlideHandler(activeSlide - 1);
      }
      if (e.deltaY > 0 && activeSlide !== slides.length - 1) {
        setActiveSlideHandler(activeSlide + 1);
      }
    }, 50);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sliderRef.current.header = document.querySelector(".tesla-header");
      sliderRef.current.content = document.querySelector(".tesla-slider");
      document.body.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.removeEventListener("wheel", handleScroll);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };
  }, [activeSlide]);

  return (
    <div className="tesla-slider">
      <SliderNavigation
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlideHandler}
        carsNames={slides.map((slide) => ({
          id: slide.id,
          name: slide.name,
          color: slide.color,
        }))}
      />

      <Slide
        animationForward={animationForward}
        activeSlide={slides[activeSlide]}
        animationState={animationState}
        setAnimationState={setAnimationState}
      />

      <div className="tesla-slider__scroll">
        <img src={mouseImg} alt="" />
      </div>
    </div>
  );
};

// TeslaSlider Component
const TeslaSlider = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>Tesla Hero Slider</title>
        <link
          rel="stylesheet"
          href="https://public.codepenassets.com/css/normalize-5.0.0.min.css"
        />
      </Head>

      <Header />
      <Slider />

      <style jsx global>{`
        /* Typography
-------------------------------------------------------------- */
        @font-face {
          font-family: "BebasNeue";
          src: url("https://raw.githubusercontent.com/10clouds/codepen/tesla-hero-slider/tesla-hero-slider/src/assets/fonts/BebasNeue-Regular.otf");
        }
        /* Breakpoints
-------------------------------------------------------------- */
        /* Media queries
-------------------------------------------------------------- */
        * {
          box-sizing: border-box;
        }

        :root {
          --btn-color: white;
          --car-color: white;
          --bckg-height: 300px;
          --shadow-opacity: 0.2;
          --car-shadow-height: 300px;
        }

        body {
          background-color: black;
          overflow-x: hidden;
        }

        ul {
          padding: 0;
          list-style: none;
        }

        .container {
          max-width: 780px;
          padding: 10px;
          margin: 0 auto;
        }
        @media only screen and (min-width: 768px) {
          .container {
            padding: 0 20px;
          }
        }
        @media only screen and (min-width: 992px) and (max-width: 1199px) {
          .container {
            max-width: 1000px;
          }
        }
        @media only screen and (min-width: 1200px) {
          .container {
            max-width: 1200px;
          }
        }
        @media only screen and (min-width: 1800px) {
          .container {
            max-width: 1550px;
          }
        }

        /* Body, html
-------------------------------------------------------------- */
        html {
          font-size: 62.5%;
        }

        body {
          font-size: 14px;
          font-size: 1.4rem;
          line-height: 22px;
          line-height: 2.2rem;
          font-family: "Helvetica", "Arial", sans-serif;
          color: #fff;
        }
        @media only screen and (min-width: 992px) {
          body {
            font-size: 16px;
            font-size: 1.6rem;
            line-height: 26px;
            line-height: 2.6rem;
          }
        }
        @media only screen and (min-width: 1800px) {
          body {
            font-size: 18px;
            font-size: 1.8rem;
          }
        }

        /* Headers
-------------------------------------------------------------- */
        h1 {
          margin: 0;
          font-size: 5.5rem;
          line-height: 1;
          font-family: "BebasNeue", "Helvetica", "Arial", sans-serif;
          letter-spacing: 0.9px;
          font-weight: 500;
        }
        @media only screen and (min-width: 768px) {
          h1 {
            font-size: 7rem;
          }
        }
        @media only screen and (min-width: 1200px) {
          h1 {
            font-size: 8rem;
          }
        }
        @media only screen and (min-width: 1800px) {
          h1 {
            font-size: 9.2rem;
          }
        }

        /* Text, Links
-------------------------------------------------------------- */
        a {
          text-decoration: none;
          color: #fff;
        }

        /* Button
-------------------------------------------------------------- */
        .button {
          position: relative;
          height: 55px;
          width: 180px;
          background: none;
          color: #fff;
          font-size: 1.4rem;
          font-weight: 300;
          text-align: center;
          border: 0;
          cursor: pointer;
        }
        @media only screen and (min-width: 992px) {
          .button {
            font-size: 1.8rem;
            width: 210px;
          }
        }
        .button:focus {
          outline: none;
        }
        .button:hover:before {
          height: 100%;
          opacity: 1;
        }
        .button:before {
          position: absolute;
          content: "";
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0;
          opacity: 0;
          background-color: var(--btn-color);
          transition: all 0.3s;
          z-index: -1;
        }
        .button__border {
          position: absolute;
          top: 0;
          left: 0;
          height: 55px;
          width: 180px;
          border: 1px solid var(--btn-color);
          transition: all 0.6s ease-in-out;
        }
        .button__border:after {
          position: absolute;
          content: "";
          left: 50%;
          top: 50%;
          width: 150%;
          height: 220%;
          opacity: 0.3;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            ellipse at center,
            var(--btn-color) 1%,
            transparent 80%
          );
          z-index: -1;
          transition: opacity 0.6s ease-in-out, background 0.6s linear 0.5s;
        }
        @media only screen and (min-width: 992px) {
          .button__border {
            width: 210px;
          }
        }
        .button__border--enter {
          border: 1px solid transparent;
        }
        .button__border--enter:after {
          opacity: 0;
          background: transparent;
        }
        .button__border--exit {
          border: 1px solid transparent;
        }
        .button__border--exit:after {
          opacity: 0.2;
          background: transparent;
        }

        /* Header
-------------------------------------------------------------- */
        .tesla-header {
          display: flex;
          justify-content: space-between;
          padding: 25px 0;
        }
        @media only screen and (min-width: 1200px) {
          .tesla-header {
            padding: 50px 0 60px;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-header {
            padding: 80px 0;
          }
        }
        .tesla-header__logo img {
          height: 12.5px;
          width: auto;
        }
        .tesla-header__nav img {
          height: 20px;
          width: auto;
        }

        /* Slide Item
-------------------------------------------------------------- */
        .tesla-slide {
          position: relative;
          margin-top: 50px;
          width: 100%;
          order: 1;
          /* Slide Item Img
  -------------------------------------------------------------- */
          /* Slide Item Img
  -------------------------------------------------------------- */
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide {
            margin-top: 70px;
          }
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slide {
            margin-top: 0;
            width: calc(100% - 150px);
          }
        }
        .tesla-slide__img {
          position: absolute;
          overflow: hidden;
          transform: translateX(0) scale(1);
          transition: opacity 0.8s ease-in-out 0.05s,
            transform 0.8s ease-in-out 0.1s;
        }
        @media only screen and (max-width: 767px) {
          .tesla-slide__img {
            width: 100%;
            transform: none;
            overflow: initial;
          }
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide__img {
            margin-top: 0;
            top: -5%;
            right: -50%;
            z-index: -1;
          }
        }
        @media only screen and (min-width: 992px) {
          .tesla-slide__img {
            top: -35%;
            right: -25%;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slide__img {
            top: -50%;
            right: -19%;
          }
        }
        .tesla-slide__img:before {
          position: absolute;
          content: "";
          width: calc(var(--car-shadow-height));
          height: calc(var(--car-shadow-height) * 1.4);
          top: 45%;
          left: 60%;
          transform: translate(-50%, -50%);
          opacity: 0.35;
          background: radial-gradient(
            ellipse at center,
            var(--car-color) 10%,
            transparent 75%
          );
          transition: opacity 0.5s ease-in 0.3s;
          z-index: 9;
        }
        @media only screen and (min-width: 992px) {
          .tesla-slide__img:before {
            width: calc(var(--car-shadow-height) * 2);
            height: calc(var(--car-shadow-height) * 1.8);
            opacity: 0.4;
          }
        }
        .tesla-slide__img-floor {
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.7s ease-in-out 0.4s;
        }
        .tesla-slide__img-car {
          transition: opacity 0.6s ease-in-out 0.1s;
        }
        .tesla-slide__img--enter {
          opacity: 0;
          transform: translateX(-5%) scale(1.1);
        }
        .tesla-slide__img--enter .tesla-slide__img-floor {
          opacity: 0;
        }
        .tesla-slide__img--enter .tesla-slide__img-car {
          opacity: 0;
        }
        .tesla-slide__img--enter:before {
          opacity: 0;
        }
        .animation-back .tesla-slide__img--enter {
          opacity: 0;
          transform: scale(0.8);
        }
        .tesla-slide__img--exit {
          transition: opacity 0.5s ease-in-out 0.4s,
            transform 0.8s ease-in-out 0.3s;
          opacity: 0;
          transform: scale(0.9);
        }
        .tesla-slide__img--exit .tesla-slide__img-floor {
          transition: all 0.5s ease-in-out 0.2s;
          opacity: 0;
        }
        .tesla-slide__img--exit:before {
          transition: opacity 0.5s ease-in-out;
          opacity: 0;
        }
        .animation-back .tesla-slide__img--exit {
          transition: opacity 0.5s ease-in-out 0.6s,
            transform 0.9s ease-in-out 0.1s;
          transform: translateX(-5%) scale(1.1);
        }
        .animation-back .tesla-slide__img--exit .tesla-slide__img-floor {
          transition: all 0.5s ease-in-out 0.2s;
          opacity: 0;
        }
        .animation-back .tesla-slide__img--exit .tesla-slide__img-car {
          transition: opacity 0.6s ease-in-out 0.5s;
          opacity: 0;
        }
        .animation-back .tesla-slide__img--exit:before {
          transition: opacity 0.5s ease-in 0.3s;
        }
        .tesla-slide__img img {
          max-width: 100%;
          min-width: 600px;
          transform: translateX(-50%);
          margin: -100px 0 0 55%;
        }
        @media only screen and (max-width: 480px) {
          .tesla-slide__img img {
            margin: -10px 0 0 40%;
          }
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide__img img {
            max-width: 85%;
            transform: none;
            margin: -40px 0 0;
          }
        }
        @media only screen and (min-width: 992px) {
          .tesla-slide__img img {
            min-width: 800px;
            margin-top: 0;
            max-width: 1300px;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slide__img img {
            max-width: 2000px;
          }
        }
        .tesla-slide__bckg {
          position: absolute;
          right: 5%;
          bottom: 38%;
          width: 250px;
          height: calc(var(--bckg-height) / 2.2);
          z-index: -1;
        }
        @media only screen and (max-width: 480px) {
          .tesla-slide__bckg {
            right: 3%;
            bottom: 35%;
            height: calc(var(--bckg-height) / 2.5);
          }
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide__bckg {
            width: 300px;
            height: calc(var(--bckg-height) / 1.8);
            bottom: 40%;
            right: 0;
          }
        }
        @media only screen and (min-width: 992px) {
          .tesla-slide__bckg {
            width: 400px;
            height: calc(var(--bckg-height) / 1.5);
            right: -2%;
          }
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slide__bckg {
            bottom: 56%;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slide__bckg {
            height: var(--bckg-height);
            width: 570px;
            right: 2%;
          }
        }
        .tesla-slide__bckg:before,
        .tesla-slide__bckg:after {
          position: absolute;
          content: "";
          transition: all 0.8s ease-in-out 0.3s;
        }
        .tesla-slide__bckg:after {
          width: calc(var(--bckg-height) * 1.2);
          height: calc(var(--bckg-height) * 0.8);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.5;
          background: radial-gradient(
            ellipse at center,
            var(--car-color) 25%,
            transparent 65%
          );
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide__bckg:after {
            width: calc(var(--bckg-height) * 2);
            height: calc(var(--bckg-height) * 1.5);
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slide__bckg:after {
            width: calc(var(--bckg-height) * 3.5);
            height: calc(var(--bckg-height) * 2.2);
          }
        }
        .tesla-slide__bckg:before {
          width: calc(var(--bckg-height) * 1.5);
          height: calc(var(--bckg-height) * 0.7);
          top: 70%;
          left: -40%;
          opacity: var(--shadow-opacity);
          background: radial-gradient(
            ellipse at center,
            var(--car-color) 10%,
            transparent 65%
          );
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide__bckg:before {
            width: calc(var(--bckg-height) * 3.5);
            height: var(--bckg-height);
            top: 100%;
            left: -80%;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slide__bckg:before {
            width: calc(var(--bckg-height) * 4.5);
          }
        }
        .tesla-slide__bckg-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0.8;
          background: var(--car-color);
          transition: all 0.8s ease-in 0.3s, transform 0.8s ease-in-out,
            background 0s;
        }
        .tesla-slide__bckg--enter .tesla-slide__bckg-fill {
          height: 0;
          top: 0;
          bottom: 100%;
          opacity: 0.3;
          transform: translateY(-20px) scale(1.1);
          transition: all 0.7s ease-in 0.5s, transform 0.8s ease-in-out 0.1s,
            background 0s;
        }
        .tesla-slide__bckg--enter:before,
        .tesla-slide__bckg--enter:after {
          opacity: 0;
        }
        .animation-back .tesla-slide__bckg--enter .tesla-slide__bckg-fill {
          bottom: 0;
          top: 100%;
          transform: translateY(10px) scale(0.9);
        }
        .tesla-slide__bckg--exit .tesla-slide__bckg-fill {
          transition: all 0.6s ease-in 0.1s, background 0s;
          height: 0;
          top: 100%;
          bottom: 0;
          opacity: 0.2;
          transform: translateY(10px) scale(0.9);
        }
        .tesla-slide__bckg--exit:before {
          transition: all 0.6s ease-in-out 0.2s;
        }
        .tesla-slide__bckg--exit:before,
        .tesla-slide__bckg--exit:after {
          opacity: 0;
        }
        .animation-back .tesla-slide__bckg--exit .tesla-slide__bckg-fill {
          top: 0;
          bottom: 100%;
          transform: translateY(-20px) scale(1.1);
        }

        /* Slide Item Aside
-------------------------------------------------------------- */
        .tesla-slide-aside {
          text-align: left;
          /* Slide Item Whole name
  -------------------------------------------------------------- */
          /* Slide Item Name
  -------------------------------------------------------------- */
          /* Slide Item Description
  -------------------------------------------------------------- */
          /* Slide Button
  -------------------------------------------------------------- */
        }
        @media only screen and (max-width: 767px) {
          .tesla-slide-aside {
            padding-left: 20px;
          }
        }
        @media only screen and (max-width: 480px) {
          .tesla-slide-aside {
            padding-left: 0;
          }
        }
        .tesla-slide-aside__wholename {
          height: auto;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-aside__wholename {
            height: 75px;
          }
        }
        .tesla-slide-aside__wholename > span {
          height: 55px;
          vertical-align: top;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-aside__wholename > span {
            height: 75px;
          }
        }
        .tesla-slide-aside__name {
          position: relative;
          display: inline-block;
          width: 40%;
          overflow: hidden;
        }
        @media only screen and (max-width: 767px) {
          .tesla-slide-aside__name {
            width: 65%;
          }
        }
        @media only screen and (max-width: 480px) {
          .tesla-slide-aside__name {
            width: 230px;
          }
        }
        .tesla-slide-aside__name-part {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 1;
          display: block;
          margin-left: 15px;
          transition: top 0.5s ease-out 0.1s, opacity 0.4s linear;
        }
        .tesla-slide-aside__name-part--enter {
          left: 0;
          top: 100%;
          opacity: 0;
        }
        .animation-back .tesla-slide-aside__name-part--enter {
          top: -100%;
        }
        .tesla-slide-aside__name-part--exit {
          left: 0;
          top: -100%;
          opacity: 0;
          transition: top 0.5s ease-out 0.4s, opacity 0.4s linear 0.4s;
        }
        .animation-back .tesla-slide-aside__name-part--exit {
          top: 100%;
        }
        .tesla-slide-aside__desc {
          position: relative;
          margin: 10px 0 0;
          max-width: 420px;
          height: 5rem;
          overflow: hidden;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-aside__desc {
            margin-top: 40px;
          }
        }
        .tesla-slide-aside__desc-text {
          position: absolute;
          display: block;
          left: 0;
          top: 0;
          bottom: 0;
          margin: 0;
          line-height: 2.5rem;
          letter-spacing: 0.5px;
          font-weight: 300;
          opacity: 1;
          transition: top 0.4s ease-out 0.2s, bottom 0.4s ease-out 0.2s,
            opacity 0.4s ease-out 0.3s, line-height 0.3s ease-out 0.5s;
        }
        .tesla-slide-aside__desc-text--enter {
          left: 0;
          top: 100%;
          bottom: 0;
          opacity: 0;
          line-height: 4rem;
        }
        .animation-back .tesla-slide-aside__desc-text--enter {
          top: -100%;
          bottom: auto;
          line-height: 3rem;
        }
        .tesla-slide-aside__desc-text--exit {
          transition: bottom 0.5s ease-out 0.3s, top 0.5s ease-out 0.3s,
            opacity 0.4s ease-out 0.3s, line-height 0.3s ease-out 0.2s;
          left: 0;
          top: auto;
          bottom: 100%;
          opacity: 0;
          line-height: 4rem;
        }
        .animation-back .tesla-slide-aside__desc-text--exit {
          top: 100%;
          bottom: auto;
        }
        .tesla-slide-aside__button {
          position: relative;
          height: 50px;
          margin-top: 25px;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-aside__button {
            margin-top: 50px;
          }
        }
        .tesla-slide-aside__button button {
          z-index: 1;
        }

        /* Slide Params
  -------------------------------------------------------------- */
        .tesla-slide-params {
          margin: 250px 0 30px;
        }
        @media only screen and (max-width: 480px) {
          .tesla-slide-params {
            margin-top: 350px;
          }
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-params {
            margin-top: 130px;
          }
        }
        @media only screen and (min-width: 992px) {
          .tesla-slide-params {
            margin: 170px 0 20px;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slide-params {
            margin: 225px 0 80px;
          }
        }
        .tesla-slide-params__list {
          display: flex;
          justify-content: center;
          margin: 0 auto;
          width: 100%;
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slide-params__list {
            padding-left: 10%;
          }
        }
        .tesla-slide-params__item {
          text-align: center;
          width: 190px;
        }
        .tesla-slide-params__item:first-of-type .tesla-slide-params__wrapper {
          padding-left: 10px;
          width: 160px;
          text-align: left;
        }
        .tesla-slide-params__item:first-of-type
          .tesla-slide-params__wrapper
          .tesla-slide-params__value {
          padding-left: 5px;
        }
        .tesla-slide-params__wrapper {
          display: inline-block;
          margin-bottom: 10px;
        }
        .tesla-slide-params__value {
          padding: 0 8px;
          font-size: 3.1rem;
          transition: opacity 0.05s ease-in;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-params__value {
            font-size: 4.8rem;
          }
        }
        .tesla-slide-params__value--enter {
          opacity: 0.7;
        }
        .tesla-slide-params__value--exit {
          opacity: 0;
        }
        .tesla-slide-params__prefix {
          display: inline-block;
          vertical-align: top;
          font-size: 2rem;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slide-params__prefix {
            font-size: 3rem;
          }
        }
        .tesla-slide-params__name {
          margin-top: -5px;
          font-size: 1.4rem;
        }
        .tesla-slide-params__sufix {
          font-family: "BebasNeue", "Helvetica", "Arial", sans-serif;
          letter-spacing: 0.9px;
          font-size: initial;
        }

        /* Slider
-------------------------------------------------------------- */
        .tesla-slider {
          padding-top: 20px;
          /* Mouse scroll
  -------------------------------------------------------------- */
        }
        @media only screen and (min-width: 992px) {
          .tesla-slider {
            padding-top: 40px;
          }
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slider {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-top: 0;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slider {
            padding-top: 135px;
          }
        }
        .tesla-slider__scroll {
          order: 3;
          width: 100%;
        }
        .tesla-slider__scroll img {
          display: block;
          margin: 0 auto;
        }

        /* Slider Navigation
-------------------------------------------------------------- */
        .tesla-slider-navigation {
          /* Slider Navigation List
  -------------------------------------------------------------- */
          /* Slider Navigation List item
  -------------------------------------------------------------- */
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slider-navigation {
            order: 2;
            width: 150px;
          }
        }
        .tesla-slider-navigation__list {
          display: flex;
          margin: 0;
          justify-content: space-around;
          text-align: center;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slider-navigation__list {
            margin: 5px;
          }
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slider-navigation__list {
            display: block;
            order: 2;
            text-align: right;
          }
        }
        .tesla-slider-navigation__item {
          display: inline-block;
          padding: 0 5px;
          text-transform: uppercase;
          line-height: 1;
          font-size: 1.2rem;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slider-navigation__item {
            font-size: 1.5rem;
            letter-spacing: 0.6px;
          }
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slider-navigation__item {
            display: block;
            margin-top: 90px;
          }
        }
        @media only screen and (min-width: 1800px) {
          .tesla-slider-navigation__item {
            margin-top: 95px;
          }
        }
        .tesla-slider-navigation__item:first-of-type {
          margin-top: 0;
        }
        .tesla-slider-navigation__link--active {
          font-size: 1.2rem;
          transition: font-size 0.3s linear, color 0.2s linear 0.8s;
        }
        @media only screen and (min-width: 768px) {
          .tesla-slider-navigation__link--active {
            font-size: 1.4rem;
          }
        }
        @media only screen and (min-width: 1200px) {
          .tesla-slider-navigation__link--active {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TeslaSlider;
