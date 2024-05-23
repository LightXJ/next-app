import React, { useEffect, useState } from "react";

const EventListener = ()=>{
  const [count, setCount] = useState(0);

  const handleScroll = ()=>{
    console.log('scroll', count);
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  }, [count])

  return (
    <div style={{height: 2000}}>
      <div>{count}</div>
      <button onClick={()=>setCount(prev=>prev+1)}>点击</button>
    </div>
  )
}

export default EventListener;