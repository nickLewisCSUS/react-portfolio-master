import React, { Component } from 'react';
import ParticlesBackground from './ParticlesBackground';

class Header extends Component {
  constructor(props) {
    super(props);
    this.backgrounds = [
      `${process.env.PUBLIC_URL}/images/nebula-cloud.jpg`,
    ];
    this.state = {
      navOpen: false,
      typingText: 'Nicholas Lewis',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.typingMessages = ['Nicholas Lewis', 'Coding is Life!'];
    this.typingIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.typingTimer = setInterval(this.handleTyping, 120); // typing speed
  }

  handleTyping = () => {
    const currentMessage = this.typingMessages[this.typingIndex];
    const fullLength = currentMessage.length;

    if (this.isDeleting) {
      this.charIndex--;
      if (this.charIndex <= 0) {
        this.isDeleting = false;
        this.typingIndex = (this.typingIndex + 1) % this.typingMessages.length;
      }
    } else {
      this.charIndex++;
      if (this.charIndex === fullLength + 1) {
        setTimeout(() => {
          this.isDeleting = true;
        }, 2500); // 1 second pause before deleting
        return;
      }
    }

    this.setState({
      typingText: currentMessage.substring(0, this.charIndex)
    });
  };


  handleScroll = () => {
    const nav = document.getElementById('nav-wrap');
    if (nav) nav.classList.toggle('shrink', window.scrollY > 60);
  };

  componentWillUnmount() {
     window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.typingTimer);
  }

  toggleNav = () => {
    this.setState((prev) => ({ navOpen: !prev.navOpen }));
  };

  render() {
    const { navOpen } = this.state;

    let name, occupation, description, location, networks;
    if (this.props.data) {
      const { name: n, occupation: o, description: d, location: l, social } = this.props.data;
      name = n;
      occupation = o;
      description = d;
      location = l;
      networks = social.map((network) => (
        <li key={network.name}>
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.className}></i>
          </a>
        </li>
      ));
    }

    return (
      <header id="home">
        <div
          className="background-slide visible"
          style={{ backgroundImage: `url(${this.backgrounds})` }}
        />

        {/* Particle layer */}
        <ParticlesBackground />

        <nav id="nav-wrap" className={navOpen ? 'open' : ''}>
  <div id="nav-inner">
    <a
      id="equation-logo"
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.toggleNav();
      }}
    >
      𝑎⁽ˡ⁾ = σ(𝑊⁽ˡ⁾𝑎⁽ˡ⁻¹⁾ + 𝑏⁽ˡ⁾)
    </a>
    <ul id="nav" className="nav">
      <li className="current">
        <a className="smoothscroll" href="#home" onClick={this.toggleNav}>Home</a>
      </li>
      <li><a className="smoothscroll" href="#about" onClick={this.toggleNav}>About</a></li>
      <li><a className="smoothscroll" href="#resume" onClick={this.toggleNav}>Resume</a></li>
      <li><a className="smoothscroll" href="#portfolio" onClick={this.toggleNav}>Works</a></li>
      <li><a className="smoothscroll" href="#testimonials" onClick={this.toggleNav}>Quotes</a></li>
      <li><a className="smoothscroll" href="#contact" onClick={this.toggleNav}>Contact</a></li>
    </ul>
  </div>

  <a className="mobile-btn" onClick={this.toggleNav} title="Toggle navigation">
    <i className={`fa ${navOpen ? 'fa-times' : 'fa-bars'}`}></i>
  </a>
</nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline fade-in-up hero-title">
              <span className="responsive-headline typing">
                {this.state.typingText}
              </span>
            </h1>
            <h3 className="fade-in-up hero-subtitle">
              I'm a <strong>{location}</strong> based <span>{occupation}</span>.<br />
              {description}.
            </h3>
            <hr />
            <ul className="social fade-in-up">{networks}</ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
        </p>
      </header>
    );
  }
}

export default Header;