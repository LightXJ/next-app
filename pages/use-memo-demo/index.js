import React, { useRef, useState } from 'react';

export default function Demo(){
  const [count, setCount ] = useState(0);

  function onRenderCallback(...args){
    const [ id, phase, actualDuration, baseDuration ] = args;
    console.group();
    console.log('id', id);
    console.log('phase', phase);
    console.log('actualDuration', actualDuration);
    console.log('baseDuration', baseDuration);
    console.groupEnd();
  }

  return (
    <>
      <button onClick={()=>{setCount(count=>++count)}}>增加</button>
      {count}
      <React.Profiler id="ExpensiveTree" onRender={onRenderCallback}>
        {/* <ExpensiveTree /> */}
        <MemoTree />
      </React.Profiler>
    </>
    
  )
}

function ExpensiveTree(props){
  console.log('props', props);
  const renderCount = useRef(0);

  renderCount.current++;
  return new Array(1000).fill().map((item, index)=>{
      return (
        <div key={index}>list</div>
      )
    })
}

const MemoTree = React.memo(ExpensiveTree);
