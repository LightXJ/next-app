import React, {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import * as echarts from 'echarts';

const Echart = forwardRef((props, ref)=>{
  const { style, options } = props;

  const chartRef = useRef();
  const chartInstance = useRef();

  useImperativeHandle(ref, ()=>{
    return {
      getInstance: ()=>{
        return chartInstance.current;
      }
    }
  })

  useEffect(()=>{
    console.log('options', options);
    const renderedInstance = echarts.getInstanceByDom(chartRef.current);

    if (renderedInstance) {
      chartInstance.current = renderedInstance;
    } else {
      console.log('init');
      chartInstance.current = echarts.init(chartRef.current);
    }
    if(chartInstance.current){
      chartInstance.current.setOption(options, false);
    }

    // return ()=>{
    //   chartInstance.current.dispose();
    // }    
  }, [options]);

  useEffect(()=>{
    chartInstance.current = echarts.init(chartRef.current);
    return ()=>{
      chartInstance.current.dispose();
    }
  }, [])

  return (
    <div
      ref={chartRef}
      style={style}
    />
  )
})

export default Echart;