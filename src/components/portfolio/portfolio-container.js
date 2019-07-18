import React, * as react from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends react.Component {
    constructor () {
        super();
        this.state = {
            pagetitle: "welcome to my portfolio",
            isloading: false,
            data: []
        };
        
        this.handleFilter=this.handleFilter.bind(this);
    }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    getPortfolioItems() {
        axios
        .get("https://grahamdavis.devcamp.space/portfolio/portfolio_items")
        .then(response => {
            this.setState({
                data: response.data.portfolio_items
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    portfolioitems() {
        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item}/>;
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isloading) {
            return <div>Loading...</div>
        }
        
        return(
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
                {this.portfolioitems()}
            </div>
        );
    }
}