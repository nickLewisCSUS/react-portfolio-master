import React, { Component } from 'react';
import ParticlesBackground from './ParticlesBackground';

class Header extends Component {
  constructor(props) {
    super(props);
    this.backgrounds = [`${process.env.PUBLIC_URL}/images/nebula-cloud.jpg`];
    this.state = {
      navOpen: false,
      typingText: 'Nicholas Lewis',
      activeSection: 'home',
    };
  }

  // sections we track for highlighting
  _ids = ['home', 'about', 'resume', 'portfolio', 'testimonials', 'contact'];

  // nav + scroll state
  _navHeight = 72;
  _suppressUntil = 0;

  refreshSections = () => {
    this._sections = this._ids.map(id => document.getElementById(id)).filter(Boolean);
  };

  onNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // update UI immediately
    this.setState({ activeSection: id, navOpen: false });

    // suppress scroll-driven updates during animation
    this._suppressUntil = performance.now() + 450;

    // use current nav height (handles shrink)
    const navEl = document.getElementById('nav-wrap');
    this._navHeight = navEl?.offsetHeight || this._navHeight || 72;

    // scroll to element with fixed-nav offset
    const targetY = el.getBoundingClientRect().top + window.scrollY - this._navHeight;
    this.smoothScrollTo(targetY, 350);
  };

  smoothScrollTo = (targetY, duration = 350) => {
    const startY = window.scrollY;
    const delta  = targetY - startY;
    const start  = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t * (2 - t); // easeOutQuad
      window.scrollTo(0, startY + delta * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // simple typewriter for the hero name
  handleTyping = () => {
    const msgs = this.typingMessages || ['Nicholas Lewis'];
    const i = this.typingIndex ?? 0;
    const deleting = this.isDeleting ?? false;
    const full = msgs[i];

    let text = this.state.typingText;
    if (!deleting) text = full.slice(0, (this.charIndex || 0) + 1);
    else           text = full.slice(0, (this.charIndex || 0) - 1);

    this.setState({ typingText: text });
    this.charIndex = (this.charIndex || 0) + (deleting ? -1 : 1);

    if (!deleting && text === full) {
      this.isDeleting = true;
      return;
    }
    if (deleting && text === '') {
      this.isDeleting = false;
      this.typingIndex = (i + 1) % msgs.length;
      this.charIndex = 0;
    }
  };

  updateActiveSection = () => {
    // if children mount later, refresh once
    if (!this._sections || this._sections.length < this._ids.length) {
      this.refreshSections();
    }
    if (!this._sections || !this._sections.length) return;
    if (performance.now() < (this._suppressUntil || 0)) return;

    const navEl = document.getElementById('nav-wrap');
    this._navHeight = navEl?.offsetHeight || this._navHeight || 72;

    const anchorY = window.scrollY + this._navHeight + 8;

    let activeId = this._sections[0].id;
    for (const sec of this._sections) {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const padTop = Math.min(parseFloat(getComputedStyle(sec).paddingTop) || 0, 80);
      const visualTop = top + padTop;
      const visualBottom = top + rect.height;
      if (anchorY >= visualTop && anchorY < visualBottom) {
        activeId = sec.id;
        break;
      }
    }
    if (activeId !== this.state.activeSection) {
      this.setState({ activeSection: activeId });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    this._onHashChange = () => {
      const id = (location.hash || '#home').slice(1) || 'home';
      if (this.state.activeSection !== id) this.setState({ activeSection: id });
    };
    window.addEventListener('hashchange', this._onHashChange, { passive: true });

    // typing setup
    this.typingMessages = ['Nicholas Lewis', 'Coding is Life!'];
    this.typingIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingTimer = setInterval(this.handleTyping, 120);

    // initial nav height
    this._navHeight = document.getElementById('nav-wrap')?.offsetHeight || 72;

    // cache sections now and on next frame (if children mount later)
    this.refreshSections();
    requestAnimationFrame(this.refreshSections);

    // start tracking
    this.updateActiveSection();
    window.addEventListener('scroll', this.updateActiveSection, { passive: true });

    this._onResize = () => {
      this._navHeight = document.getElementById('nav-wrap')?.offsetHeight || 72;
      this.refreshSections();
      this.updateActiveSection();
    };
    window.addEventListener('resize', this._onResize, { passive: true });
  }

  handleScroll = () => {
    const nav = document.getElementById('nav-wrap');
    if (nav) nav.classList.toggle('shrink', window.scrollY > 60);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.updateActiveSection);
    window.removeEventListener('hashchange', this._onHashChange);
    window.removeEventListener('resize', this._onResize);
    clearInterval(this.typingTimer);
  }

  toggleNav = () => {
    this.setState((prev) => ({ navOpen: !prev.navOpen }));
  };

  render() {
    const { navOpen } = this.state;

    let name, occupation, description, location, networks, tagline;
    if (this.props.data) {
      const {
        name: n,
        occupation: o,
        description: d,
        location: l,
        social,
        tagline: t,                 // new, concise line for the hero
      } = this.props.data;
      name = n; occupation = o; description = d; location = l; tagline = t;
      networks = (social || []).map((network) => (
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
          style={{ backgroundImage: `url(${this.backgrounds[0]})` }}
        />
        <ParticlesBackground />

        <nav id="nav-wrap" className={navOpen ? 'open' : ''}>
          <div id="nav-inner">
            {/* Equation (right via CSS order) */}
            <a
              id="equation-logo"
              href="/"
              onClick={(e) => { e.preventDefault(); window.location.reload(); }}
            >
              𝑎⁽ˡ⁾ = σ(𝑊⁽ˡ⁾𝑎⁽ˡ⁻¹⁾ + 𝑏⁽ˡ⁾)
            </a>

            {/* Mobile hamburger */}
            <button
              className="mobile-toggle"
              aria-label="Toggle navigation"
              aria-expanded={navOpen}
              onClick={this.toggleNav}
            >
              <span />
              <span />
              <span />
            </button>

            {/* Menu (left via CSS order) */}
            <ul id="nav" className="nav">
              <li data-active={this.state.activeSection === 'home'}>
                <a className="smoothscroll" href="#home" onClick={(e) => this.onNavClick(e, 'home')}>Home</a>
              </li>
              <li data-active={this.state.activeSection === 'about'}>
                <a className="smoothscroll" href="#about" onClick={(e) => this.onNavClick(e, 'about')}>About</a>
              </li>
              <li data-active={this.state.activeSection === 'resume'}>
                <a className="smoothscroll" href="#resume" onClick={(e) => this.onNavClick(e, 'resume')}>Resume</a>
              </li>
              <li data-active={this.state.activeSection === 'portfolio'}>
                <a className="smoothscroll" href="#portfolio" onClick={(e) => this.onNavClick(e, 'portfolio')}>Works</a>
              </li>
              <li data-active={this.state.activeSection === 'testimonials'}>
                <a className="smoothscroll" href="#testimonials" onClick={(e) => this.onNavClick(e, 'testimonials')}>Quotes</a>
              </li>
              <li data-active={this.state.activeSection === 'contact'}>
                <a className="smoothscroll" href="#contact" onClick={(e) => this.onNavClick(e, 'contact')}>Contact</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline fade-in-up hero-title">
              <span className="responsive-headline typing">{this.state.typingText}</span>
            </h1>

            {/* concise tagline instead of repeating About content */}
            <h3 className="fade-in-up hero-subtitle">
              {tagline || 'Aspiring Software Engineer · Hackathons · Game Dev · Creative Tech'}
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
