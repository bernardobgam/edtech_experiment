var data = {
        datasets: [
            {
              data: [
                {x:0,y:0},{x:1,y:20},{x:2,y:33},{x:3,y:42},{x:4,y:50},{x:5,y:57},{x:6,y:63},{x:7,y:69},{x:8,y:74},
                {x:9,y:78},{x:10,y:81},{x:11,y:84},{x:12,y:86},{x:13,y:88},{x:14,y:89},{x:15,y:90},{x:16,y:90},
                {x:17,y:90},{x:18,y:90},{x:19,y:90},{x:20,y:90},{x:21,y:90},{x:22,y:90},{x:23,y:90},{x:24,y:90},
              ],
              borderWidth: 4,
              borderColor: '#009688',
              pointRadius: 1,
              pointBorderWidth: 6,
              fill: 'false',
              backgroundColor: '#009688',
              pointBorderColor: '#009688'
            }
  ]}

//Options of the chart
var options = {
  maintainAspectRatio: false,
  title: {
    display: true,
  },
  hover: {
      mode: 'index',
      intersect: false
   },
  tooltips: {
    mode: 'index',
    intersect: false,
    displayColors: false,
  },
        legend: {
            display: false,
            labels: {
              fontColor: "black",
              filter: (legendItem, chartData) => {
                return chartData.datasets[legendItem.datasetIndex].label;
              }
            },
            position: 'right'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                },
                scaleLabel: {
                    labelString: "Final Grade",
                    display: true
                }
            }],
            xAxes: [{
                position: 'bottom',
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    stepSize: 1,
                    max: 24
                },
                scaleLabel: {
                    labelString: 'Hours of study per day',
                    display: true
                }
            }]
        },
    }

    var ctx = document.getElementById("canvas-p8").getContext("2d");
    var MyChart = new Chart(ctx, {type: 'line', data: JSON.parse(JSON.stringify(data)), options: JSON.parse(JSON.stringify(options)) })
    MyChart.options.title.text =  "Figure 3.5"
    // MyChart.data.datasets[0].backgroundColor = "#4068de70";
    MyChart.options.tooltips.callbacks.label = function(tooltipItems, data) { return 'Grade ' + tooltipItems.yLabel; }
    MyChart.options.tooltips.callbacks.title = function(tooltipItems, data) { return tooltipItems[0].xLabel + " hours of study per day"}

    var ctx2 = document.getElementById("canvas-p9").getContext("2d");
    var MyChart2 = new Chart(ctx2, {type: 'line', data: JSON.parse(JSON.stringify(data)), options: JSON.parse(JSON.stringify(options)) })
    MyChart2.options.title.text =  "Figure 3.5"
    MyChart2.options.tooltips.callbacks.label = function(tooltipItems, data) { return 'Grade ' + tooltipItems.yLabel; }
    MyChart2.options.tooltips.callbacks.title = function(tooltipItems, data) { return tooltipItems[0].xLabel + " hours of study per day"}
    MyChart2.data.datasets.push({
      data: [{x:4,y:0},{x:4,y:50},{x:0,y:50}],
      borderWidth: 2,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    MyChart2.data.datasets.push({
      data: [{x:5,y:0},{x:5,y:57},{x:0,y:57}],
      borderWidth: 2,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    MyChart2.data.datasets.push({
      data: [{x:10,y:0},{x:10,y:81},{x:0,y:81}],
      borderWidth: 2,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    MyChart2.data.datasets.push({
      data: [{x:11,y:0},{x:11,y:84},{x:0,y:84}],
      borderWidth: 2,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    MyChart2.data.datasets.push({
      data: [{x:15,y:0},{x:15,y:90},{x:0,y:90}],
      borderWidth: 2,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    MyChart2.data.datasets.push({
      data: [{x:24,y:0},{x:24,y:90},{x:0,y:90}],
      borderWidth: 2,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    // MyChart2.data.datasets.push({
    //   data: [{x:2,y:37.5},{x:4,y:50},{x:6,y:65}],
    //   borderWidth: 2,
    //   borderColor: 'black',
    //   pointRadius: 0,
    //   pointBorderWidth: 0,
    //   fill: 'false',
    //   backgroundColor: 'black',
    //   pointBorderColor: 'black',
    //   borderDash: [5,5],
    //   lineTension:0,
    // })

    var ctx3 = document.getElementById("canvas-p10").getContext("2d");
    var MyChart3 = new Chart(ctx3, {type: 'line', data: JSON.parse(JSON.stringify(data)), options: JSON.parse(JSON.stringify(options)) })
    MyChart3.options.title.text =  "Figure 3.5"
    // MyChart3.options.tooltips.callbacks.label = function(tooltipItems, data) { return console.log(data.datasets[0].data[tooltipItems.index].y,data,tooltipItems);'Grade ' + tooltipItems.yLabel; }
    MyChart3.options.tooltips.callbacks.label = function(tooltipItems, data) { if (tooltipItems.datasetIndex === 0) return 'Grade ' + tooltipItems.yLabel}
    MyChart3.options.tooltips.callbacks.title = function(tooltipItems, data) { return tooltipItems[0].xLabel + " hours of study per day"}
    MyChart3.data.datasets.push({
      data: [{x:4,y:12.5}],
      borderWidth: 4,
      borderColor: 'darkblue',
      pointRadius: 4,
      pointBorderWidth: 4,
      fill: 'false',
      backgroundColor: 'darkblue',
      pointBorderColor: 'darkblue',
    })
    MyChart3.data.datasets.push({
      data: [{x:5,y:7}],
      borderWidth: 4,
      borderColor: 'darkviolet',
      pointRadius: 4,
      pointBorderWidth: 4,
      fill: 'false',
      backgroundColor: 'darkviolet',
      pointBorderColor: 'darkviolet',
    })
    MyChart3.data.datasets.push({
      data: [{x:4,y:0},{x:4,y:50},{x:0,y:50}],
      borderWidth: 4,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })
    MyChart3.data.datasets.push({
      data: [{x:5,y:0},{x:5,y:57},{x:0,y:57}],
      borderWidth: 4,
      borderColor: 'grey',
      pointRadius: 0,
      pointBorderWidth: 0,
      fill: 'false',
      backgroundColor: 'grey',
      pointBorderColor: 'grey',
      borderDash: [5,5],
      lineTension:0,
    })

// var data = {
//         datasets: [
//             {
//               data: [{x:0,y:0},{x:100,y:100}],
//               borderWidth: 4,
//               borderColor: 'red',
//               pointRadius: 2,
//               pointBorderWidth: 1,
//               fill: 'false',
//               backgroundColor: 'red',
//               pointBorderColor: 'red'
//             }
//   ]}
//
// //Options of the chart
// var options = {
//   maintainAspectRatio: false,
//   title: {
//     display: true,
//   },
//   tooltips: {
//     displayColors: false
//   },
//         legend: {
//             display: false,
//             labels: {
//               fontColor: "black",
//               filter: (legendItem, chartData) => {
//                 return chartData.datasets[legendItem.datasetIndex].label;
//               }
//             },
//             position: 'right'
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     min: 0,
//                     callback: function(label, index, labels) {
//                         return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                       }
//                     // max: 100
//                 },
//                 scaleLabel: {
//                     labelString: "Price $",
//                     display: true
//                 }
//             }],
//             xAxes: [{
//                 position: 'bottom',
//                 type: 'linear',
//                 ticks: {
//                     beginAtZero: true,
//                     min: 0,
//                     stepSize: 1,
//                     // max: 100
//                 },
//                 scaleLabel: {
//                     labelString: 'Quantity',
//                     display: true
//                 }
//             }]
//         },
//     }
//
//     var ctx = document.getElementById("canvas").getContext("2d");
//     var MyChart = new Chart(ctx, {type: 'line', data: JSON.parse(JSON.stringify(data)), options: JSON.parse(JSON.stringify(options)) })
//     MyChart.options.scales.yAxes[0].ticks.callback =  function(label, index, labels) { return '$ ' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
//     MyChart.options.title.text =  "Supply"
//     MyChart.data.datasets[0].backgroundColor = "#4068de70";
//     MyChart.options.tooltips.callbacks.label = function(tooltipItems, data) { return '$ ' + numberWithCommas(Math.round(tooltipItems.yLabel * 100) / 100); }
//     MyChart.options.tooltips.callbacks.title = function(tooltipItems, data) { return tooltipItems[0].xLabel + " años"}


//
//   var data2 = {
//           datasets: [
//               {
//                 data: [{x:0,y:0},{x:100,y:100}],
//                 borderWidth: 4,
//                 borderColor: 'red',
//                 pointRadius: 2,
//                 pointBorderWidth: 1,
//                 fill: 'false',
//                 backgroundColor: 'red',
//                 pointBorderColor: 'red'
//               }
//     ]}
//
//   //Options of the chart
//   var options2 = {
//     maintainAspectRatio: false,
//     title: {
//       display: true,
//     },
//     tooltips: {
//       displayColors: false
//     },
//           legend: {
//               display: false,
//               labels: {
//                 fontColor: "black",
//                 filter: (legendItem, chartData) => {
//                   return chartData.datasets[legendItem.datasetIndex].label;
//                 }
//               },
//               position: 'right'
//           },
//           scales: {
//               yAxes: [{
//                   ticks: {
//                       // beginAtZero: true,
//                       // min: 0,
//                       callback: function(label, index, labels) {
//                           return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         }
//                       // max: 100
//                   },
//                   scaleLabel: {
//                       labelString: "Price $",
//                       display: true
//                   }
//               }],
//               xAxes: [{
//                   position: 'bottom',
//                   type: 'linear',
//                   ticks: {
//                       // beginAtZero: true,
//                       // min: 0,
//                       stepSize: 1,
//                       // max: 100
//                   },
//                   scaleLabel: {
//                       labelString: 'Quantity',
//                       display: true
//                   }
//               }]
//           },
//       }
//
//       var ctx2 = document.getElementById("canvas-page-3").getContext("2d");
//       var MyChart2 = new Chart(ctx2, {type: 'line', data: JSON.parse(JSON.stringify(data2)), options: JSON.parse(JSON.stringify(options2)) })
//       // MyChart.options.scales.yAxes[0].ticks.callback =  function(label, index, labels) { return '$ ' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
//       MyChart2.options.title.text =  "Supply"
//       MyChart2.data.datasets = [
//             {
//               data: [
//                 {z:1870,x:,y:3096},
//                 {z:1880,y:3044},
//                 {z:1890,y:2983},
//                 {z:1900,y:2938},
//                 {z:1913,y:2900},
//                 {z:1929,y:2316},
//                 {z:1938,y:1756},
//                 {z:1950,y:2008},
//                 {z:1960,y:2033},
//                 {z:1973,y:1942},
//                 {z:1980,y:1853},
//                 {z:1990,y:1840},
//                 {z:2000,y:1878}
//               ],
//               borderWidth: 4,
//               borderColor: 'red',
//               pointRadius: 2,
//               pointBorderWidth: 1,
//               fill: 'false',
//               backgroundColor: 'red',
//               pointBorderColor: 'red'
//             },
//             {
//               data: [
//                 {z:1870,y:3168},
//                 {z:1880,y:3165},
//                 {z:1890,y:3119},
//                 {z:1900,y:3115},
//                 {z:1913,y:2933},
//                 {z:1929,y:2198},
//                 {z:1938,y:1760},
//                 {z:1950,y:2045},
//                 {z:1960,y:2025},
//                 {z:1973,y:1849},
//                 {z:1980,y:1696},
//                 {z:1990,y:1558},
//                 {z:2000,y:1443}
//               ],
//               borderWidth: 4,
//               borderColor: 'green',
//               pointRadius: 2,
//               pointBorderWidth: 1,
//               fill: 'false',
//               backgroundColor: 'green',
//               pointBorderColor: 'green'
//             },
//             {
//               data: [
//                 {z:1870,y:3274},
//                 {z:1880,y:3194},
//                 {z:1890,y:3105},
//                 {z:1900,y:3037},
//                 {z:1913,y:2942},
//                 {z:1929,y:2233},
//                 {z:1938,y:2281},
//                 {z:1950,y:2156},
//                 {z:1960,y:2002},
//                 {z:1973,y:1709},
//                 {z:1980,y:1667},
//                 {z:1990,y:1414},
//                 {z:2000,y:1352}
//               ],
//               borderWidth: 4,
//               borderColor: 'royalblue',
//               pointRadius: 2,
//               pointBorderWidth: 1,
//               fill: 'false',
//               backgroundColor: 'royalblue',
//               pointBorderColor: 'royalblue'
//             }
//   ]
//       // MyChart.data.datasets[0].backgroundColor = "#4068de70";
//       // MyChart.options.tooltips.callbacks.label = function(tooltipItems, data) { return '$ ' + numberWithCommas(Math.round(tooltipItems.yLabel * 100) / 100); }
//       // MyChart.options.tooltips.callbacks.title = function(tooltipItems, data) { return tooltipItems[0].xLabel + " años"}
