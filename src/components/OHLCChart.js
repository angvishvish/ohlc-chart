
import React, { Component } from 'react';

import Axios from '../api';
import { CreateChartData, CreateOHLCCharts } from './helper';


class OHLCChart extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false
        };
    }

    componentDidMount = () => {
        this.getChart();
    }


    getChart = () => {
        this.setState({
            isLoading: true
        });
        Axios.get(`/historical?interval=9`)
            .then(res => {
                this.createChart(res.data);
            })
            .catch(err => {
                this.createChart(JSON.parse(localStorage.getItem('ohlcChartData') || '[]'));
            });
    }

    createChart = (chartData) => {
        this.disposeChart();
        this.chart = CreateOHLCCharts();
        localStorage.setItem('ohlcChartData', JSON.stringify(chartData));
        this.chart.addData(CreateChartData(chartData));
        this.chart.events.on("shown", () => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentWillUnmount() {
        this.disposeChart();
    }

    disposeChart = () => {
        if (this.chart) {
            this.chart.dispose();
        }
    }


    render() {
        return (
            <React.Fragment>
                {this.error ? <h3 className="flex-center has-error">{this.error}</h3> : null}
                {this.state.isLoading ? <h3 className="flex-center">Loading Updated Chart...</h3> : null}
                <div id="chartDiv" style={{ width: "100%", height: "400px" }}></div>
            </React.Fragment>
        );
    }
};

export default OHLCChart;
