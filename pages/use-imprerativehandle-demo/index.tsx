import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button } from 'antd';

interface RefObject {
  focus: ()=> void,
  resetValue: ()=>void
}

const Index = () => {
  const inputEl = useRef<RefObject>(null);

  useEffect(()=>{
    inputEl.current?.focus();
  }, [])

  const resetInput = () => {
    inputEl.current?.resetValue();
  }

  return (
    <>
      <RefFancyInput ref={inputEl}/>
      <Button onClick={resetInput}>重置</Button>
    </>
  );
};


interface Handle {
  focus: ()=>void,
  resetValue: ()=>void
}
interface AppProps {
  [key: string]: any,
}
const RefFancyInput = forwardRef<Handle, AppProps>((props, ref)=>{
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    resetValue: ()=>{
      if(inputRef.current){
        inputRef.current.value = '';
      }
    }
  }));
  return <input 
          placeholder='请输入'
          ref={inputRef} 
        />;
});

export default Index;