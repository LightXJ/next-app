import { useState } from "react";


function GrandParent({children}){
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={()=>setCount(count=>count+1)}>增加</button>
      <div>I am GrandParent</div>
      <div>count: {count}</div>
      {children}
    </>
  )
}

function Parent(){
  console.log('parent render');
  return (
    <>
      <div>I am Parent</div>
      <Child />
    </>
  )
}

function Child(){
  console.log('child render');
  return (
    <div>I am child</div>
  )
}

export default function App(){
  return (
    <GrandParent>
      <Parent />
    </GrandParent>
  )
}