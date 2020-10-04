
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
            liveChartIntervalId: null
        };
        this.chart = CreateOHLCCharts([]);
    }
    
    componentDidMount = () => {
        this.getChartData('?interval=1');
    }

    getChartData = (intervalQuery) => {
        this.clearInterval();
        Axios.get(`/historical${intervalQuery}`)
        .then(res => {
            this.createChart(res.data);
        });
    }

    clearInterval = () => {
        if (this.state.liveChartIntervalId) {
            clearInterval(this.state.liveChartIntervalId);
        }
    }

    createChart = (chartData) => {
        this.disposeChart();
        this.chart = CreateOHLCCharts();
        const liveChartData = CreateChartData(chartData);
        let index = 0;
        const liveChartIntervalId = setInterval(() => {
            if (liveChartData.length !== index) {
                this.chart.addData(liveChartData[index++])
            } else {
                this.clearInterval();
            }
        }, 250)
        this.setState({
            liveChartIntervalId
        })
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
                <span>Filter Interval results as per your requirement: </span>
                <DropDownMenu
                    interval={this.state.interval}
                    handleInterval={(interval) => this.getChartData(`?interval=${interval}`, true)} />
                {this.state.isLoading ? <h3 className="flex-center">Loading Updated Chart...</h3> : null}
                <div id="chartDiv" style={{ width: "100%", height: "400px" }}></div>
            </React.Fragment>
        );
    }
};

export default LiveCharts;
