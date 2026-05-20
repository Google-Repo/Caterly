import logo from "../assets/logo-02.png";
import "./Navbar.css";

const Navbar = ({ onLogout, onAboutClick, onHomeClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a
          href="/"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault();
            onHomeClick();
          }}
        >
          <img src={logo} alt="Caterly Logo" />
        </a>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <a
              href="#home"
              className="navbar-link active"
              onClick={(e) => {
                e.preventDefault();
                onHomeClick();
              }}
            >
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#about"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                onAboutClick();
              }}
            >
              About Us
            </a>
          </li>
          <li className="navbar-item dropdown">
            <a
              href="#services"
              className="navbar-link"
              onClick={() => onHomeClick()}
            >
              Services
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  href="#gourmet-food-services"
                  className="dropdown-link"
                  onClick={() => onHomeClick()}
                >
                  gourmet food services
                </a>
              </li>
              <li>
                <a
                  href="#hospitality-and-events"
                  className="dropdown-link"
                  onClick={() => onHomeClick()}
                >
                  hospitality and Events
                </a>
              </li>
            </ul>
          </li>
          <li className="navbar-item">
            <a
              href="#menu"
              className="navbar-link"
              onClick={() => onHomeClick()}
            >
              Menu
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="#contact"
              className="navbar-link"
              onClick={() => onHomeClick()}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="navbar-actions">
          <button className="btn-primary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
