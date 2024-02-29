import React, { useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';
import cloneDeep from 'lodash/cloneDeep';
import Echart  from "@/components/echart";

const EchartsDragDemo = ()=>{
  const dataRef = useRef([]);
  const myChartRef = useRef();
  const [options, setOptions] = useState({});


  useEffect(()=>{
    setTimeout(()=>{
      dataRef.current = [
        {
          name: 'line1',
          list: [
            {
              datePoint: 'aa',
              value: 10,
            },
            {
              datePoint: 'bb',
              value: 20,
            },
            {
              datePoint: 'cc',
              value: 30,
            },
          ]
        },
        {
          name: 'line2',
          list: [
            {
              datePoint: 'aa',
              value: 110,
            },
            {
              datePoint: 'bb',
              value: 210,
            },
            {
              datePoint: 'cc',
              value: 310,
            },
          ]
        }
      ];
      setChartOptions();
    }, 500)
  }, [])

  const setChartOptions = ()=>{
    const xAxisData = dataRef.current[0].list.map(item=>item.datePoint);
    const options = {
      title: {
        text: 'Try Dragging these Points',
        left: 'center'
      },
      grid: {
        top: '8%',
        bottom: '12%'
      },
      xAxis: {
        type: 'category',
        axisLine: { onZero: false },
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        axisLine: { onZero: false },
      },
      series: getSeriesData(dataRef.current),
    }

    // myChart.current.setOption(options);
    setOptions(options);

    setTimeout(function () {
      const chartInstance = myChartRef.current.getInstance();
      console.log('chartInstance', chartInstance);
      const newOptions = {
        ...options,
        graphic: dataRef.current[0].list.map(function (item, dataIndex) {
          return {
            type: 'circle',
            position: chartInstance.convertToPixel('grid', [item.datePoint, item.value]),
            shape: {
              cx: 0,
              cy: 0,
              r: 10
            },
            invisible: true,
            draggable: true,
            ondrag: function (dx, dy) {
              onPointDragging(dataIndex, [this.x, this.y]);
            },
            z: 100
          };
        })
      }
      setOptions(newOptions);
      // Add shadow circles (which is not visible) to enable drag.
      // myChart.current.setOption({
      //   graphic: dataRef.current[0].list.map(function (item, dataIndex) {
      //     return {
      //       type: 'circle',
      //       position: myChart.current.convertToPixel('grid', [item.datePoint, item.value]),
      //       shape: {
      //         cx: 0,
      //         cy: 0,
      //         r: 10
      //       },
      //       invisible: true,
      //       draggable: true,
      //       ondrag: function (dx, dy) {
      //         onPointDragging(dataIndex, [this.x, this.y]);
      //       },
      //       onmousemove: function () {
      //         showTooltip(dataIndex);
      //       },
      //       onmouseout: function () {
      //         hideTooltip(dataIndex);
      //       },
      //       z: 100
      //     };
      //   })
      // });
    }, 0);

  }

  const onPointDragging=(dataIndex, pos) =>{
    // 移动后的值
    const chartInstance = myChartRef.current.getInstance();
    const valueAfterMove = chartInstance.convertFromPixel('grid', pos);
    dataRef.current[0].list[dataIndex].value = valueAfterMove[1];
    const seriesData = getSeriesData(dataRef.current);

    setTimeout(()=>{
      console.log('chartInstance', chartInstance);
      const newOptions = {
        ...options,
        series: seriesData,
        graphic: dataRef.current[0].list.map(function (item, dataIndex) {
          return {
            type: 'circle',
            position: chartInstance.convertToPixel('grid', [item.datePoint, item.value]),
            shape: {
              cx: 0,
              cy: 0,
              r: 10
            },
            invisible: true,
            draggable: true,
            ondrag: function (dx, dy) {
              onPointDragging(dataIndex, [this.x, this.y]);
            },
            z: 100
          };
        })
      }
      setOptions(newOptions);
    //   chartInstance.setOption({
    //     series: seriesData,
    //     graphic: dataRef.current[0].list.map(function (item, dataIndex) {
    //       return {
    //         type: 'circle',
    //         position: chartInstance.convertToPixel('grid', [item.datePoint, item.value]),
    //         shape: {
    //           cx: 0,
    //           cy: 0,
    //           r: 10
    //         },
    //         invisible: true,
    //         draggable: true,
    //         ondrag: function (dx, dy) {
    //           onPointDragging(dataIndex, [this.x, this.y]);
    //         },
    //         z: 100
    //       };
    //     })
    //   });
    },0)
   
  }

  // function showTooltip(dataIndex) {
  //   myChart.current.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex: 0,
  //     dataIndex: dataIndex
  //   });
  // }
  // function hideTooltip(dataIndex) {
  //   myChart.current.dispatchAction({
  //     type: 'hideTip'
  //   });
  // }

  // function updatePosition() {
  //   myChart.current.setOption({
  //     graphic: dataRef.current.map(function (item, dataIndex) {
  //       return {
  //         position: myChart.current.convertToPixel('grid', item)
  //       };
  //     })
  //   });
  // }

  const getSeriesData = (data)=>{
    const symbolSize = 20;
    return data.map(item=>{
      const { list, name } = item;
      return {
        id: item.name,
        name,
        type: 'line',
        smooth: true,
        symbolSize: symbolSize,
        data: list.map(item=>{
          return {
            value: item.value
          }
        })
      }
    })
  }



  return (
    <>
    <Echart
      style={{height: 400, width: 500}}
      options={options}
      ref={myChartRef}
    />
    {/* <div id="chart-wrap" style={{width: 500, height: 400}}></div> */}
    </>
  )
}

export default EchartsDragDemo;