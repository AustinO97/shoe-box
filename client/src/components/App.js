import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Shoes from './Shoes';
import Users from './Users';
// import Reviews from './components/Reviews';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Shoes</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/shoes">Shoes</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Shoes} />
          <Route path="/users" component={Users} />
          {/* <Route path="/shoes" component={Shoes} />
          <Route path="/reviews" component={Reviews} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;