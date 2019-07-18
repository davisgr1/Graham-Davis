import React from 'react';

const PortfolioSidebarList = (props) => {
    const PortfolioList = props.data.map(portfolioItem => {
        return (
            <div>
                <h1>{portfolioItem.name}</h1>
                <h2>{portfolioItem.id}</h2>
            </div>
        );
    });
    return <div>{PortfolioList}</div>
};


export default PortfolioSidebarList;