import React, { Component } from 'react';
import resume from '../Resume_Nick_Lewis.pdf';

class About extends Component {
  render() {
    if (!this.props.data) return null;

    const { name, image, bio, address, phone, email } = this.props.data;
    const profilepic = `images/${image}`;
    const { city, state, zip } = address || {};

    return (
      <section id="about">
        <div className="about-grid">
          {/* Avatar */}
          <div className="about-avatar">
            <img className="profile-pic" src={profilepic} alt={`${name} profile portrait`} />
          </div>

          {/* Card */}
          <div className="about-card">
            <h2 className="fade-delay-1">About Me</h2>
            <p className="fade-delay-2">{bio}</p>

            <h3 className="about-subtitle fade-delay-3">Contact Details</h3>

            <address className="contact-chips fade-delay-3">
              <span className="chip">
                <i className="fa fa-user" aria-hidden="true" />
                {name}
              </span>
              <span className="chip">
                <i className="fa fa-map-marker" aria-hidden="true" />
                {city}, {state} {zip}
              </span>
              <a className="chip" href={`tel:${phone}`} aria-label="Call phone">
                <i className="fa fa-phone" aria-hidden="true" />
                {phone}
              </a>
              <a className="chip" href={`mailto:${email}`} aria-label="Send email">
                <i className="fa fa-envelope" aria-hidden="true" />
                {email}
              </a>
            </address>

            <div className="about-cta">
              <a href={resume} className="button button-gradient" download>
                <i className="fa fa-download" aria-hidden="true" />
                Download Resume
              </a>
              <a href={`mailto:${email}`} className="button button-ghost">
                <i className="fa fa-paper-plane" aria-hidden="true" />
                Email Me
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
