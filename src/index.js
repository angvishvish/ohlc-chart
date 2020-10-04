import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/common/Header';
import OHLCChart from './components/OHLCChart';
import LiveCharts from './components/LiveCharts';
import 'semantic-ui-css/semantic.min.css';
import './assets/style.css';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <div className="padding-top pos-relative">
                    <Header />
                    <Route path="/" exact component={OHLCChart} />
                    <Route path="/live-charts" component={LiveCharts} />
                </div>
            </BrowserRouter>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
