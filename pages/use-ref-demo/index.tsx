import * as React from 'react';
import { useRef, useEffect } from 'react';


export default function Index(){
  const countRef = useRef(0);

  useEffect(()=>{
    const id = setInterval(()=>{
      countRef.current = new Date().getTime();
      console.log(countRef.current);
    }, 1000)
    return (()=>{
      clearInterval(id);
    })
  })

  return (
    <div>
      {countRef.current}
    </div>
  )
}