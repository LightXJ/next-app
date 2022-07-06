import React, { useState } from 'react';


function ValueItem(){
  const [value, setValue] = useState('');
  return (
    <input
      type="text"
      onChange={(e)=>setValue(e.target.value)} 
      value={value}
    />
  )
}

export default function KeyDemo(){
  return (
    <>
      <ValueItem key="1" />
    </>
  )
}