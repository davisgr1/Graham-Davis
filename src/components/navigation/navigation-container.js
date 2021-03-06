import React from "react";
import axios from 'axios';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationComponent = (props) => {
    const dynamicLink = (route, linkText) => {
        return (
            <div className="navlink">
                <NavLink to={route} activeClassName="nav-link-active">
                    {linkText}
                </NavLink>
            </div>  
        );
    };

    const handleSignOut = ()  => {
        axios.delete("https://api.devcamp.space/logout", { withCredentials: true }).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch(error =>{
            console.log("Error signing out", error)
        })
    }
                    
        return (
            <div className="nav-wrapper">
                <div className="left-side">
                    <div className="navlink">
                        <NavLink exact to="/" activeClassName="nav-link-active">
                            Home
                        </NavLink>
                    </div> 
                    <div className="navlink">
                        <NavLink to="/about-me" activeClassName="nav-link-active">
                        About
                        </NavLink>
                    </div>
                    <div className="navlink">
                        <NavLink to="/contact-me" activeClassName="nav-link-active">
                        Contact
                        </NavLink>
                    </div> 
                    <div className="navlink">
                        <NavLink to="/blog" activeClassName="nav-link-active">
                        Blog
                        </NavLink>
                    </div>

                    {props.loggedinstatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
               </div>

               <div className="right-side">
                   GRAHAM DAVIS

                   {props.loggedinstatus === 'LOGGED_IN' ? <a onClick={handleSignOut}>Sign Out</a>: null}
               </div>
            </div>  
        );
}

export default withRouter(NavigationComponent);