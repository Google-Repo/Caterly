import React from "react";
import "./BreakfastPackages.css";

const hiteaPackages = [
  {
    id: "hi-tea-royal",
    name: "Royal English Tea",
    price: "₹400/person",
    description:
      "Classic scones, veggie finger sandwiches, clotted cream, jam, and premium Earl Grey selection.",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hi-tea-indian",
    name: "Masala Chai & Snacks",
    price: "₹300/person",
    description:
      "Ginger tea served with piping hot samosas, pakoras, and traditional Indian sweets.",
    image:
      "https://images.unsplash.com/photo-1599307734115-4467793d5676?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hi-tea-patisserie",
    name: "Sweet Patisserie",
    price: "₹550/person",
    description:
      "Colorful macarons, eclairs, fruit tarts, and a selection of flavored artisanal coffees.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const HiTeaPackages = ({ onBack }) => {
  return (
    <section className="breakfast-packages">
      <div className="packages-container">
        <div className="section-header">
          <h2 className="section-title">
            Gourmet <span className="highlight">Hi Tea Packages</span>
          </h2>
          <p className="section-subtitle">
            An elegant afternoon experience featuring exquisite savory and sweet
            bites.
          </p>
          <button className="btn-secondary back-button" onClick={onBack}>
            &larr; Back to Gourmet Services
          </button>
        </div>

        <div className="packages-grid">
          {hiteaPackages.map((pkg) => (
            <div key={pkg.id} className="package-card animate-fade-in">
              <div className="package-image-wrapper">
                <img src={pkg.image} alt={pkg.name} className="package-image" />
              </div>
              <div className="package-info">
                <h3>{pkg.name}</h3>
                <p className="package-price">{pkg.price}</p>
                <p className="package-description">{pkg.description}</p>
                <button className="btn-primary package-button">
                  Select Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiTeaPackages;
