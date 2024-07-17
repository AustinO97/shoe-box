import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

const About = () => {

  return (
    <div className="about-container">
      <h1 className='header'>Shoe Box</h1>
      <p>Click <NavLink to="/" activeClassName="active"><FontAwesomeIcon icon={faHome} /> Home</NavLink> to see shoes we have.</p>
      <p>Click <NavLink to="/users" activeClassName="active"><FontAwesomeIcon icon={faUsers} /> Users</NavLink> to see our users.</p>
      <p>Click <NavLink to="/reviews" activeClassName="active"><FontAwesomeIcon icon={faStar} /> Reviews</NavLink> to see reviews our users have left.</p>
      <p>Click <NavLink to="/add-shoe" activeClassName="active"><FontAwesomeIcon icon={faPlus} /> New Shoe</NavLink> to add a shoe you love.</p>
    </div>
  )
}

export default About