
import React, { Component } from 'react';

import Axios from '../api';
import DropDownMenu from './common/DropDownMenu';
import { CreateChartData, CreateOHLCCharts } from './helper';

class LiveCharts extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            interval: 1,
            intervalId: null
        };
        this.chart = CreateOHLCCharts([]);
        this.getChartData('?interval=1');
    }

    componentDidMount = () => {
        this.showLiveChart();
    }


    showLiveChart = () => {
        const intervalId = setInterval(() => {
            this.setState({
                interval: (this.state.interval + 1),
                isLoading: true
            });
            if (this.state.interval === 9) {
                this.clearInterval();
            }
            this.getChartData(`?interval=${this.state.interval}`);
        }, 10000);

        this.setState({
            intervalId
        });

    }

    getChartData = (intervalQuery, breakInterval = false) => {
        if (breakInterval) {
            this.clearInterval();
        }
        Axios.get(`/historical${intervalQuery}`).then(res => {
            this.createChart(res.data);
        });
    }

    clearInterval = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    createChart = (chartData) => {
        this.disposeChart();
        this.chart = CreateOHLCCharts();
        this.chart.data = CreateChartData(chartData);
        this.chart.events.on("ready", () =>{
            this.setState({
                isLoading: false
            });
        });

    }

    componentWillUnmount() {
        this.clearInterval();
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
                <h3>Filter Interval results as per your requirement:</h3>
                <DropDownMenu
                    interval={this.state.interval}
                    handleInterval={(interval) => this.getChartData(`?interval=${interval}`, true)} />
                {this.state.isLoading ? <h3 className="flex-center">Loading Updated Chart...</h3> : null}
                <div id="chartDiv" style={{ width: "100%", height: "calc(100vh - 250px)" }}></div>
            </React.Fragment>
        );
    }
};

export default LiveCharts;
