import React, { useState, useCallback, useRef } from 'react';
// import { useSize } from 'ahooks';
import useSize from './use-size';

export default function Demo(){
  const [width, setWidth] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(width)}px width</h2>
      <SizeDemo />
    </>
  );
}


function SizeDemo(){
  const ref = useRef(null);
  const size = useSize(ref);

  return (
    <div ref={ref}>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  )
}