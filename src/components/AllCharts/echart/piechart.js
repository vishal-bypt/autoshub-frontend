import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"

class Pie extends Component {

  constructor(props) {
    super(props);
  }

  getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        //data: ["Laptop", "Tablet", "Mobile", "Others", "Desktop"],
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"],
      series: [
        {
          name: "Total sales",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: this.props.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "350px" }} option={this.getOption()} />
      </React.Fragment>
    )
  }
}
export default Pie