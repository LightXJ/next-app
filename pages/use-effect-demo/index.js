import {  useEffect, useState } from 'react'
import { Button } from 'antd';

export default function Home() {
  const [count, setCount] = useState(0);

  function handleAdd(){
    setCount(count+1);
  }

  return (
    <div>
      <Button onClick={handleAdd}>add count</Button>
      <Example someProp={count}/>
    </div>
  )
}

function Example({ someProp }) {
  function doSomething(){
    console.log(someProp);
  }

  useEffect(()=>{
    doSomething();
  }, []);

  return (
    <div>{someProp}</div>
  )
}


