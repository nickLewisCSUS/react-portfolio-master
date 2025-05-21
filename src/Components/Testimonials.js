import React, { Component } from 'react';

class Testimonials extends Component {
      componentDidMount() {
      setTimeout(() => {
         if (window.$ && window.$.fn.flexslider) {
            window.$('.flexslider').flexslider({
               animation: "fade",
               controlNav: true,
               directionNav: false,
               slideshowSpeed: 6000,
               animationSpeed: 800,
               smoothHeight: true
            });
         }
      }, 100); // Delay 100ms to ensure DOM is ready
   }
  render() {

    if(this.props.data){
      var testimonials = this.props.data.testimonials.map(function(testimonials){
        return  <li key={testimonials.user}>
            <blockquote>
               <p>{testimonials.text}</p>
               <cite>{testimonials.user}</cite>
            </blockquote>
         </li>
      })
    }

    return (
   <section id="testimonials">
  <div className="text-container">
    <div className="row">

      <div className="quote-intro-container">
        <p className="quote-intro">Some thoughts that inspire my approach to code and creativity.</p>
      </div>

      <div className="two columns header-col">
        <h1><span>Quotes</span></h1>
      </div>

      <div className="ten columns">
        <div className="flexslider">
          <ul className="slides">
            {testimonials}
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>
   );
  }
}

export default Testimonials;
