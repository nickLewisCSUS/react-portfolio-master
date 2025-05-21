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
      previousIndex: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.interval = setInterval(this.changeBackground, 6000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.interval);
  }

  changeBackground = () => {
    this.setState((prev) => ({
      previousIndex: prev.currentIndex,
      currentIndex: (prev.currentIndex + 1) % this.backgrounds.length
    }));
  };

  handleScroll = () => {
    const nav = document.getElementById('nav-wrap');
    if (nav) {
      nav.classList.toggle('shrink', window.scrollY > 60);
    }
  };

  toggleNav = () => {
    this.setState((prev) => ({ navOpen: !prev.navOpen }));
  };

  render() {
    const { currentIndex, previousIndex, navOpen } = this.state;
    const currentImage = this.backgrounds[currentIndex];
    const previousImage = previousIndex !== null ? this.backgrounds[previousIndex] : null;

    const { data } = this.props;
    const name = data?.name;
    const occupation = data?.occupation;
    const description = data?.description;
    const location = data?.location;
    const networks = data?.social?.map((network) => (
      <li key={network.name}>
        <a href={network.url} target="_blank" rel="noopener noreferrer">
          <i className={network.className}></i>
        </a>
      </li>
    ));

    return (
      <header id="home">
        {/* Previous image (fades out) */}
        {previousImage && (
          <div
            className="background-layer"
            style={{ backgroundImage: `url(${previousImage})` }}
          ></div>
        )}

        {/* Current image (fades in) */}
        <div
          className="background-layer show"
          style={{ backgroundImage: `url(${currentImage})` }}
        ></div>

        {/* Navigation */}
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
