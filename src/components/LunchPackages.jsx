import React from "react";
import "./BreakfastPackages.css"; // Reusing the same styling

const lunchPackages = [
  {
    id: "lunch-standard",
    name: "Desi Executive Platter",
    price: "₹450/person",
    description:
      "A balanced meal with lentils, seasonal vegetables, rice, fresh rotis, and a sweet dish.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lunch-buffet",
    name: "Mediterranean Buffet",
    price: "₹750/person",
    description:
      "Exotic salads, creamy hummus, falafel, pita bread, grilled paneer, and authentic baklava.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lunch-italian",
    name: "Italian Classic",
    price: "₹600/person",
    description:
      "Your choice of pasta, wood-fired thin crust pizza, garlic bread, and classic Tiramisu.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const LunchPackages = ({ onBack }) => {
  return (
    <section className="breakfast-packages">
      <div className="packages-container">
        <div className="section-header">
          <h2 className="section-title">
            Gourmet <span className="highlight">Lunch Packages</span>
          </h2>
          <p className="section-subtitle">
            Sophisticated midday meals crafted to provide both flavor and
            energy.
          </p>
          <button className="btn-secondary back-button" onClick={onBack}>
            &larr; Back to Gourmet Services
          </button>
        </div>

        <div className="packages-grid">
          {lunchPackages.map((pkg) => (
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

export default LunchPackages;
