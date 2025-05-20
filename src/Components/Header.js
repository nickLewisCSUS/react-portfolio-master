import React, { Component } from 'react';

class Header extends Component {

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

   render() {
      // Declare variables outside of the if-block so they're available in JSX
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
            <nav id="nav-wrap">
               <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
               <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

               <ul id="nav" className="nav">
                  <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
                  <li><a className="smoothscroll" href="#about">About</a></li>
                  <li><a className="smoothscroll" href="#resume">Resume</a></li>
                  <li><a className="smoothscroll" href="#portfolio">Works</a></li>
                  <li><a className="smoothscroll" href="#testimonials">Quotes</a></li>
                  <li><a className="smoothscroll" href="#contact">Contact</a></li>
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
