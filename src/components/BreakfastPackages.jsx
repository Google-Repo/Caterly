import React from "react";
import "./BreakfastPackages.css";

const breakfastPackages = [
  {
    id: "continental",
    name: "Desi Morning",
    price: "₹500/person",
    description:
      "Desi breakfast platter with Aloo Paratha, Butter Naan, and a side of curd and pickles.",
    image:
      "https://res.cloudinary.com/dohdiu2s6/image/upload/v1779210842/alooParatha_mymntf.jpg",
  },
  {
    id: "south-indian",
    name: "South Indian Classic",
    price: "₹800/person",
    description:
      "Steaming Idlis, crispy Vadas, and Masala Dosa served with authentic Sambar and Coconut Chutney.",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "healthy-start",
    name: "Healthy Start",
    price: "₹650/person",
    description:
      "Oatmeal with berries, avocado toast, green smoothie, and a selection of herbal teas.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const BreakfastPackages = ({ onBack, onSelectPackage }) => {
  return (
    <section className="breakfast-packages" id="breakfast-packages">
      <div className="packages-container">
        <div className="section-header">
          <h2 className="section-title">
            Gourmet <span className="highlight">Breakfast Packages</span>
          </h2>
          <p className="section-subtitle">
            Choose from our exquisite breakfast selections to start your day
            right.
          </p>
          <button className="btn-secondary back-button" onClick={onBack}>
            &larr; Back to Gourmet Services
          </button>
        </div>

        <div className="pure-veg-corner" aria-hidden="true">
          Pure Veg
        </div>

        <div className="packages-grid">
          {breakfastPackages.map((pkg) => (
            <div key={pkg.id} className="package-card animate-fade-in">
              <div className="package-image-wrapper">
                <img src={pkg.image} alt={pkg.name} className="package-image" />
              </div>
              <div className="package-info">
                <h3>{pkg.name}</h3>
                <p className="package-price">{pkg.price}</p>
                <p className="package-description">{pkg.description}</p>
                <button
                  className="btn-primary package-button"
                  onClick={() =>
                    onSelectPackage?.({
                      category: "breakfast",
                      packageId: pkg.id,
                      packageName: pkg.name,
                    })
                  }
                >
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

export default BreakfastPackages;
