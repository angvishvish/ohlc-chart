
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui two item menu">
        <Link className="item" to="/">Home</Link>
        <Link className="item" to="/live-charts">Live Charts</Link>
    </div>
  );
};

export default Header;
