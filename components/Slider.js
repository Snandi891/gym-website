import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const slides = [
  {
    id: 1,
    title: "Model S",
    subtitle: "Plaid",
    description: "Beyond Ludicrous",
    image: "/pic.png",
  },
  {
    id: 2,
    title: "Model 3",
    subtitle: "Performance",
    description: "Electric for Everyone",
    image: "/pic.png",
  },
  {
    id: 3,
    title: "Model X",
    subtitle: "Plaid",
    description: "Maximum Utility",
    image: "/pic.png",
  },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // auto slide every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tesla-slider">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`tesla-slide ${i === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="tesla-slide__content">
            <h2>{slide.title}</h2>
            <h3>{slide.subtitle}</h3>
            <p>{slide.description}</p>
            <div className="tesla-slide__buttons">
              <a href="#" className="btn btn--primary">
                Order Now
              </a>
              <a href="#" className="btn btn--secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="tesla-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

Slider.propTypes = {
  slides: PropTypes.array,
};
