import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"

class Pie extends Component {

  getOption = () => {
    return {
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { readOnly: true, title: "Download Data", lang: ['Data View', 'Cancel', 'Refresh'] },
          restore: { title: "Restore" },
          saveAsImage: {
            title: 'Save As picture'
          }, 
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        bottom: 'bottom',
        //data: ["Laptop", "Tablet", "Mobile", "Others", "Desktop"],
        textStyle: {
          color: ["#74788d"],
        },
      },
      //color: ["#777aca", "#5156be", "#a8aada", "#ffbf53" ],
      color: ["#ff0000", "#ff5252", "#ff7b7b", "#ffbaba"],
      //color: ["#F1B42F", "#E09540", "#FF7F50"],
      //color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"],
      series: [
        {
          name: this.props.title ? this.props.title : "Total Training",
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
