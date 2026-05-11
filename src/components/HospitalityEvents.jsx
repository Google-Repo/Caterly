import React from "react";
import "./HospitalityEvents.css";

const eventCategories = [
  {
    id: "corporate",
    title: "Corporate Events",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Professional catering and hospitality services for meetings, conferences, and gala dinners.",
  },
  {
    id: "weddings",
    title: "Weddings",
    image:
      "https://images.unsplash.com/photo-1519225495810-7517c31a2ed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Creating magical moments with exquisite menus and seamless event management for your big day.",
  },
  {
    id: "parties",
    title: "Private Parties",
    image:
      "https://images.unsplash.com/photo-1530103043960-ef38714abb15?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "From birthdays to housewarmings, we bring the celebration to life with customized services.",
  },
  {
    id: "social",
    title: "Social Gatherings",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Elegant setups and premium hospitality for community events and social meetups.",
  },
  {
    id: "anniversaries",
    title: "Anniversaries",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Celebrate milestones with curated hospitality experiences designed for intimate moments.",
  },
];

const HospitalityEvents = () => {
  return (
    <section className="hospitality-events" id="hospitality-and-events">
      <div className="events-container">
        <div className="section-header">
          <h2 className="section-title">
            Hospitality & <span className="highlight">Events</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive management and catering for your most significant
            occasions
          </p>
        </div>

        <div className="event-grid">
          {eventCategories.map((event) => (
            <div key={event.id} className="event-card animate-fade-in">
              <div className="event-image-wrapper">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
                <div className="event-overlay">
                  <button className="btn-primary">Book {event.title}</button>
                </div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalityEvents;
