import { useEffect, useState } from "react";

// ahooks的useSize 简易实现
export default function useSize(ref){
  const [state, setState] = useState();

  useEffect(()=>{
    if(!ref.current){
      return;
    }
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { clientWidth, clientHeight } = entry.target;
        setState({
          width: clientWidth,
          height: clientHeight,
        });
      }
    });
    resizeObserver.observe(ref.current);
    return ()=>{
      resizeObserver.disconnect();
    }
  }, [ref])
  
  
  return state;
}