import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Shoes from './Shoes';
import Users from './Users';
import Reviews from './Reviews';
import ShoeDetail from './ShoeDetail';
import ShoeForm from './ShoeForm';
import About from './About';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faStar, faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <NavLink exact to="/" activeClassName="active"><FontAwesomeIcon icon={faHome} />Home</NavLink>
          <NavLink to="/users" activeClassName="active"><FontAwesomeIcon icon={faUsers} /> Users</NavLink>
          <NavLink to="/reviews" activeClassName="active"><FontAwesomeIcon icon={faStar} /> Reviews</NavLink>
          <NavLink to="/add-shoe" activeClassName="active"><FontAwesomeIcon icon={faPlus} /> New Shoe</NavLink>
          <NavLink to="/about" activeClassName="active"><FontAwesomeIcon icon={faInfoCircle} /> About</NavLink>
        </nav>

        <Switch>
          <Route path="/" exact component={Shoes} />
          <Route path="/shoes/:id" component={ShoeDetail} />
          <Route path="/users" component={Users} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/add-shoe" component={ShoeForm} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
