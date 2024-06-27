import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Shoes from './Shoes';
import Users from './Users';
import Reviews from './Reviews';

function App() {
  return (
    <Router>
      <div>
        <nav>

            <Link to="/">Shoes</Link>
            
            <Link to="/users">Users</Link>
            
            <Link to="/shoes">Shoes</Link>
            
            <Link to="/reviews">Reviews</Link>
            

        </nav>

        <Switch>
          <Route path="/" exact component={Shoes} />
          <Route path="/users" component={Users} />
          <Route path="/shoes" component={Shoes} />
          <Route path="/reviews" component={Reviews} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;