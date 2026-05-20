import "./SideGourmetService.css";

const SideGourmetService = ({
  selectedCategory,
  selectedPackage,
  visible,
  notification,
  onClear,
}) => {
  if (!visible) return null;

  if (visible) {
    // Auto-scroll so popup remains in view
    requestAnimationFrame(() => {
      const el = document.querySelector(".side-gourmet");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <div
      className="side-gourmet-overlay"
      onMouseDown={onClear}
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed" }}
    >
      <aside className="side-gourmet" onMouseDown={(e) => e.stopPropagation()}>
        <div className="side-gourmet-header">
          <h3>Gourmet Desk</h3>
          <button
            className="side-gourmet-close"
            onClick={onClear}
            aria-label="close"
          >
            ✕
          </button>
        </div>

        <div className="side-gourmet-body">
          <div className="side-gourmet-row">
            <span className="side-gourmet-label">Service</span>
            <span className="side-gourmet-value">
              {selectedCategory ? selectedCategory : "—"}
            </span>
          </div>

          <div className="side-gourmet-row">
            <span className="side-gourmet-label">Selected package</span>
            <span className="side-gourmet-value">
              {selectedPackage ? selectedPackage : "—"}
            </span>
          </div>

          {notification && (
            <div
              className="side-gourmet-notification"
              role="status"
              aria-live="polite"
            >
              <span className="side-gourmet-badge">✅</span>
              {notification}
            </div>
          )}

          <div className="side-gourmet-note">
            You will receive an email from our manager with details within 24
            hours. For urgent inquiries, please contact us at{" "}
            <a style={{ color: "blue" }} href="mailto:yadavakshat613@gmail.com">
              yadavakshat613@gmail.com
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideGourmetService;
