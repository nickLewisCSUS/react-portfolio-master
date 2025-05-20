import React, { Component } from 'react';
import resume from '../Resume_Nick_Lewis.pdf'

class About extends Component {
   render() {

      if (this.props.data) {
         var name = this.props.data.name;
         var profilepic = "images/" + this.props.data.image;
         var bio = this.props.data.bio;
         var street = this.props.data.address.street;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var zip = this.props.data.address.zip;
         var phone = this.props.data.phone;
         var email = this.props.data.email;
         // var resumeDownload = this.props.data.resumedownload;
      }

      return (
         <section id="about">
            <div className="row about-wrapper">
               {/* Profile Picture Column */}
               <div className="three columns">
               <img className="profile-pic" src={profilepic} alt={`${name} Profile`} />
               </div>

               {/* Main Content Column */}
               <div className="nine columns main-col about-card">
                  <h2 className="fade-delay-1">About Me</h2>
                  <p className="fade-delay-2">{bio}</p>

                  <div className="section-divider"></div>

                  <div className="row fade-delay-3">
                     <div className="columns contact-details">
                        <h2>Contact Details</h2>
                        <p className="address">
                        <span>{name}</span>
                        <span>{city}, {state} {zip}</span>
                        <span><a href={`tel:${phone}`}>{phone}</a></span>
                        <span><a href={`mailto:${email}`}>{email}</a></span>
                        </p>
                     </div>

                     <div className="columns download">
                        <p>
                        <a href={resume} className="button" download>
                           <i className="fa fa-download"></i> Download Resume
                        </a>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }
}

export default About;
