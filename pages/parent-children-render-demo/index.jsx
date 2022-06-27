import React, {useState} from 'react';

export default function GrandParent(){
  const [count, setCount] = useState(0);

  const handleAddCount = ()=>{
    setCount(count=>count+1)
  }

  console.log('grandParent render');
  return (
    <>
      <button onClick={handleAddCount}>增加count+</button>
      <div>count: {count}</div>
      <div>GrandParent</div>
      <Parent />
    </>
  )
}

function Parent(){
  console.log('parent render');
  return (
    <>
      <div>Parent</div>
      <Child />
    </>
    
  )
}

function Child(){
  console.log('child render');
  return (
    <div>Child</div>
  )
}