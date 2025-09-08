<section
  className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative"
  id="testimonials"
>
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
</section>;
