import moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.options.minPolylineStep = 5;
am4core.options.queue = true;
am4core.options.deferredDelay = 500;
am4core.options.onlyShowOnViewport = true;

const RoundOffFloat = (value = 0) => {
    return parseFloat(value).toFixed(2);
}

export const CreateChartData = (chartData = []) => {
    const filteredArr = new Set(chartData);
    const FinalData = Array.from(filteredArr).reverse().map((data, index) => {
        const dataSplit = data.split(',');
        const dataObj = {
            date: moment(parseInt(dataSplit[0])).format('YYYY-MM-DD'),
            open: RoundOffFloat(dataSplit[1]),
            high: RoundOffFloat(dataSplit[2]),
            low: RoundOffFloat(dataSplit[3]),
            close: RoundOffFloat(dataSplit[4])
        }
        return dataObj;
    });
    return FinalData;
}

export const CreateOHLCCharts = () => {
    const chart = am4core.create("chartDiv", am4charts.XYChart);
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // eslint-disable-next-line
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    const series = chart.series.push(new am4charts.OHLCSeries());
    const lineSeries = chart.series.push(new am4charts.LineSeries());
    const scrollbarX = new am4charts.XYChartScrollbar();

    
    chart.paddingRight = 20;

    chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";

    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("day", "MMMM-YYYY");

    series.minBulletDistance = 20;
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.dataFields.valueY = "close";
    // eslint-disable-next-line
    series.tooltipText = "Start: ₹{openValueY.value} \n \
            Low: ₹{lowValueY.value} \n \
            High: ₹{highValueY.value} \n \
            End: ₹{valueY.value}";
    series.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();

    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    // need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;

    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;

    scrollbarX.series.push(lineSeries);
    chart.scrollbarX = scrollbarX;

    return chart;
}

