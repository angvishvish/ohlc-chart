
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui two item menu">
        <Link className="item" to="/ohlc-chart/">Home</Link>
        <Link className="item" to="/ohlc-chart/live-charts">Live Charts</Link>
    </div>
  );
};

export default Header;
