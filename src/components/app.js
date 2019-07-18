import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios';

import NavigationContainer from "./navigation/navigation-container";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog"
import PortfolioDetail from "./portfolio/Portfolio-Detail";
import PortfolioManager from "./pages/Portfolio-manager";
import Auth from "./Pages/Auth";
import NoMatch from "./pages/No-Match";

export default class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    loggedinstatus : "NOT_LOGGED_IN" 
  }
  this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
  this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
}

handleSuccessfulLogin() {
  this.setState({
    loggedinstatus : "LOGGED_IN"
  })
}

handleSuccessfulLogout() {
  this.setState({
    loggedinstatus : "NOT_LOGGED_IN"
  })
}

checkLoginStatus() {
  return axios.get("https://api.devcamp.space/logged_in", { withCredentials: true 
}).then(response => {
  const loggedIn = response.data.logged_in;
  const loggedinstatus = this.state.loggedinstatus

  if (loggedIn && loggedinstatus === "LOGGED_IN") {
    return loggedIn;
    
  } else if (loggedIn && loggedinstatus === "NOT_LOGGED_IN"){
    this.setState({
      loggedinstatus: "LOGGED_IN"
    })

  } else if (!loggedIn && loggedinstatus === "NOT_LOGGED_IN"){
    this.setState({
      loggedinstatus: "NOT_LOGGED_IN"
    })
  }
})
.catch(error => {
  console.log("Error", error);
})
}

componentDidMount() {
  this.checkLoginStatus();
}

handleUnSuccessfulLogin() {
  this.setState({
    loggedinstatus : "NOT_LOGGED_IN"
  })
}

authorizedPages () {
  return [<Route path="/portfolio-manager" component={PortfolioManager} />];
}

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer loggedinstatus=
              {this.state.loggedinstatus} 
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />

              <Route
                path="/auth" 
                render={props => (<Auth{...props}handleSuccessfulLogin= { this.handleSuccessfulLogin} 
                handleSuccessfulLogout= { this.handleSuccessfulLogout}/>)}
              />
              <Route path="/about-me" component={About} />
              <Route path="/contact-me" component={Contact} />
              <Route path="/blog" component={Blog} />
              {this.state.loggedinstatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
