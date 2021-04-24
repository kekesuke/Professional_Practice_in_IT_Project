/* App.js */
import React, { Component } from "react";
import CanvasJSReact from '../lib/canvasjs.stock.react';
import {connect} from 'react-redux'
import {getGraph} from '../actions/graphActions'
import PropTypes from 'prop-types'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  componentDidMount() {

      this.props.getGraph();
      var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
    fetch("https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from=1576329600&to="+currentTimeInSeconds+"&token=c0t93rv48v6r4maemvu0")
      .then(res => res.json())
      .then(
        (data) => {
          var dps = [];
          for (var i = 0; i < data.c.length; i++) {
            dps.push({
              x: new Date(data.t[i] * 1000),
              y: Number(data.c[i]),//close == median 
              z: Number(data.h[i])
            });
          }
          this.setState({
            isLoaded: true,
            dataPoints: dps
          });
        }
      )
  }

  render() {
    const test = this.props.graph
    //console.log(JSON.stringify(test) )
    const options = {
      title: {
        text: "BTC/USD"
      },
      theme: "light",
      subtitles: [{
        text: "BTC/USD"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY"
          }
        },
        axisY: {
          title: "Bitcoin Price",
          prefix: "$",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###.##"
          }
        },
        axisZ: {
          title: "Bitcoin Highest Price",
          prefix: "$",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###.##"
          }
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in USD)",
          value: "test",
          type: "splineArea",
          color: "#3576a8",
          yValueFormatString: "$#,###.##",
          xValueFormatString: "MMM DD YYYY",
          zValueFormatString: "$#,###.##",
          dataPoints: this.state.dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date("2017-05-01"),
          maximum: new Date("2018-05-01")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div>
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded &&
            <CanvasJSStockChart containerProps={containerProps} options={options}
            /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}

Graph.prototypes = {
  getGraph: PropTypes.func.isRequired,
  graph: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  graph: state.graph
});

export default connect(mapStateToProps, {getGraph})(Graph);   