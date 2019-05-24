

function  setOption(hourList){
  let reg=/\d+/g;
  let times=[]; //时间轴
  let wenduList = []; //温度表
  hourList.forEach((ele,index)=>{
    wenduList.push(parseInt(ele.tem));
    times.push(`${ele.day.match(reg)[1]}:00`)
  });

  return {
    xAxis: {
      position: "top",
      type: 'category',
      axisLine: {
        symbol: ['none', 'arrow']
      },
      axisTick: {
        inside: true,
      },
      splitLine: {
        show: true
      },
      max: hourList.length-1,
      min: 0,
      boundaryGap: false,
      splitNumber: hourList.length,
      data:hourList,
      axisLabel: {
        // interval:5,
        align: "center",

        formatter: function (value, index) {
          return times[index]
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value',
      axisLine: {
        symbol: ['none', 'arrow']
      },

      axisTick: {
        inside: true,
      },

      min: 0,
      max: 50,
      splitNumber: 10,

      axisLabel: {
        // interval:0,
        formatter: function (value, index) {
            let temp=value;
            value+=5;
          return `${temp}℃`
        }
      }
    },

    series: [{
      name: "温度",
      symbol: "circle",
      data: wenduList,
      type: 'line',
      smooth: true,
      smoothMonotone: true,
      label: {
        show: true,
        formatter: `{c}℃`,
        color: 'purple'
      },
      lineStyle: {
        color: 'darkblue'
      },
      areaStyle: {
        color: 'rgba(56,67,125,.3)',
      },
    }]
  };

}




export {setOption}