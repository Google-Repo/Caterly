import "./BreakfastPackages.css";

const dinnerPackages = [
  {
    id: "maharaja-grand",
    name: "Maharaja Grand Buffet",
    price: "₹950/person",
    description:
      "A royal Indian spread featuring 4 types of curries, premium Basmati pulao, assorted breads, and 3 types of traditional desserts.",
    image:
      "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "awadhi-feast",
    name: "The Golden Awadhi Feast",
    price: "₹1250/person",
    description:
      "Slow-cooked Dum Pukht delicacies, Veg Galouti Kebabs, Zafrani Paneer, and fragrant Lucknowi Biryani.",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "global-fusion",
    name: "Global Veg Extravaganza",
    price: "₹1500/person",
    description:
      "An international 5-course menu with Exotic Thai Green Curry, Italian Hand-stretched Pizzas, and Mexican Sizzlers.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const DinnerPackages = ({ onBack, onSelectPackage }) => {
  return (
    <section className="breakfast-packages">
      <div className="packages-container">
        <div className="section-header">
          <h2 className="section-title">
            Gourmet <span className="highlight">Dinner Packages</span>
          </h2>
          <p className="section-subtitle">
            Memorable fine-dining dinner courses designed for special occasions.
          </p>
          <button className="btn-secondary back-button" onClick={onBack}>
            &larr; Back to Gourmet Services
          </button>
        </div>

        <div className="packages-grid">
          {dinnerPackages.map((pkg) => (
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
                      category: "dinner",
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

export default DinnerPackages;
