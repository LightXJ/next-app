import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
  const [count, setCount] = useState(0);

  useEffect(()=>{
    setCount(1);
    console.log('useEffect', count);
    setCount(2);
    console.log('useEffect', count);
    setCount(3);
    console.log('useEffect', count);
    setCount(4);
  }, [])


  console.log('render', count);
  return (
    <div>{count}</div>
  )
}