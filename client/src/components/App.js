import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Shoes from './Shoes';
import Users from './Users';
import Reviews from './Reviews';
import ShoeDetail from './ShoeDetail';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/users" activeClassName="active">Users</NavLink>
          <NavLink to="/reviews" activeClassName="active">Reviews</NavLink>
        </nav>

        <Switch>
          <Route path="/" exact component={Shoes} />
          <Route path="/shoes/:id" component={ShoeDetail} />
          <Route path="/users" component={Users} />
          <Route path="/reviews" component={Reviews} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
