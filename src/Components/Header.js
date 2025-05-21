import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.backgrounds = [
      `${process.env.PUBLIC_URL}/images/swish-background.jpg`,
      `${process.env.PUBLIC_URL}/images/Pi-BackGround.png`,
      `${process.env.PUBLIC_URL}/images/portfolio/BigBoom.png`,
    ];

    this.state = {
      navOpen: false,
      currentIndex: 0,
      transitionImage: null,
      isFading: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.interval = setInterval(this.handleBackgroundChange, 6000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.interval);
  }

  handleBackgroundChange = () => {
    const nextIndex = (this.state.currentIndex + 1) % this.backgrounds.length;
    const nextImage = this.backgrounds[nextIndex];

    // Step 1: Fade in transition image
    this.setState({
      transitionImage: nextImage,
      isFading: true
    });

    // Step 2: After fade, swap current image and clear transition
    setTimeout(() => {
      this.setState({
        currentIndex: nextIndex,
        transitionImage: null,
        isFading: false
      });
    }, 1500); // Must match CSS fade duration
  };

  handleScroll = () => {
    const nav = document.getElementById('nav-wrap');
    if (!nav) return;
    nav.classList.toggle('shrink', window.scrollY > 60);
  };

  toggleNav = () => {
    this.setState((prev) => ({ navOpen: !prev.navOpen }));
  };

  render() {
    const { navOpen, currentIndex, transitionImage, isFading } = this.state;
    const currentImage = this.backgrounds[currentIndex];

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
        {/* Static background layer */}
        <div
          className="background-layer active"
          style={{ backgroundImage: `url(${currentImage})` }}
        />

        {/* Transition image (temporarily fades in) */}
        {transitionImage && (
          <div
            className={`background-layer fade-in`}
            style={{ backgroundImage: `url(${transitionImage})` }}
          />
        )}

        <nav id="nav-wrap" className={navOpen ? 'open' : ''}>
          <a className="mobile-btn" onClick={this.toggleNav} title="Toggle navigation">
            <i className={`fa ${navOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </a>
          <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home" onClick={this.toggleNav}>Home</a></li>
            <li><a className="smoothscroll" href="#about" onClick={this.toggleNav}>About</a></li>
            <li><a className="smoothscroll" href="#resume" onClick={this.toggleNav}>Resume</a></li>
            <li><a className="smoothscroll" href="#portfolio" onClick={this.toggleNav}>Works</a></li>
            <li><a className="smoothscroll" href="#testimonials" onClick={this.toggleNav}>Quotes</a></li>
            <li><a className="smoothscroll" href="#contact" onClick={this.toggleNav}>Contact</a></li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline fade-in-up">
              <span className="responsive-headline typing">Nicholas Lewis</span>
            </h1>
            <h3 className="fade-in-up">
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
