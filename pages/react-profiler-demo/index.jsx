import React, {useState} from 'react';
import {unstable_trace as trace} from 'scheduler/tracing';

const Main = ()=>{
  const [count, setCount] = useState(0);

  const handleCountAdd = ()=>{
    trace('Main count add', performance.now(), () => {  
      setCount(count=>count+1)
    })
  }
  return (
    <div>
      {count}
      <button onClick={handleCountAdd}>加1</button>
      <Child />
    </div> 
  )
}

const Child = ()=>{
  const [count, setCount] = useState(0);

  const handleCountAdd = ()=>{
    trace('Child count add', performance.now(), () => {  
      setCount(count=>count+1)
    })
  }
  return (
    <div>
      childCount: {count}
      <button onClick={handleCountAdd}>加1</button>
    </div> 
  )
}
function callback(...args) {
  const [id, phase, actualDuration, baseDuration, startTime, commitTime, interactions] = args;
  console.group();
  console.log('render callback id', id);
  console.log('render callback phase', phase);
  console.log('render callback actualDuration', actualDuration);
  console.log('render callback baseDuration', baseDuration);
  console.log('render callback startTime', startTime);
  console.log('render callback commitTime', commitTime);
  console.log('render callback interactions', interactions);
  console.log('mainPanel render callback id', id, actualDuration);
  console.groupEnd();
}

const Demo = ()=>{
 return (
  <React.Profiler id="main" onRender={callback}>
    <Main />
  </React.Profiler>
 )
}

export default Demo;