import React, { Component } from 'react';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
         navOpen: false
      };
   }

   componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
   }

   componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
   }

   handleScroll = () => {
      const nav = document.getElementById('nav-wrap');
      if (!nav) return;

      if (window.scrollY > 60) {
         nav.classList.add('shrink');
      } else {
         nav.classList.remove('shrink');
      }
   };

   toggleNav = () => {
      this.setState((prevState) => ({
         navOpen: !prevState.navOpen
      }));
   };

   render() {
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
            <nav id="nav-wrap" className={this.state.navOpen ? 'open' : ''}>
               {/* Toggle button (hamburger icon) */}
               <a className="mobile-btn" onClick={this.toggleNav} title="Toggle navigation">
                  <i className={`fa ${this.state.navOpen ? 'fa-times' : 'fa-bars'}`}></i>
               </a>

               {/* Navigation list */}
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
                  <ul className="social fade-in-up">
                     {networks}
                  </ul>
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