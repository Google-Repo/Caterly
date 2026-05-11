import React from "react";
import "./GourmetServices.css";

const categories = [
  {
    id: "breakfast",
    title: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Start your day with our artisanal breakfast selections and fresh morning delights.",
  },
  {
    id: "lunch",
    title: "Lunch",
    image:
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Sophisticated midday meals crafted to provide both flavor and energy.",
  },
  {
    id: "hi-tea",
    title: "Hi Tea",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "An elegant afternoon experience featuring premium teas and exquisite savory bites.",
  },
  {
    id: "dinner",
    title: "Dinner",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Memorable fine-dining dinner courses designed for special occasions.",
  },
  {
    id: "custom",
    title: "Custom",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Fully personalized menus tailored to your specific taste and event requirements.",
  },
];

const GourmetServices = () => {
  return (
    <section className="gourmet-services" id="gourmet-food-services">
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">
            Gourmet <span className="highlight">Food Services</span>
          </h2>
          <p className="section-subtitle">
            Exquisite culinary options for every time of the day
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card animate-fade-in">
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                />
                <div className="category-overlay">
                  <button className="btn-primary">
                    Explore {category.title}
                  </button>
                </div>
              </div>
              <div className="category-info">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GourmetServices;
