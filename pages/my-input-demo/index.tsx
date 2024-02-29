import React, {useState} from 'react';
import Input from './input';
import { Input as AntdInput } from 'antd';

const Demo = ()=>{
  const [state, setState] = useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = e.target;
    setState(value);
  }

  return (
    <>
      <Input value={state} defaultValue="hello world" onChange={onChange}></Input>
      <AntdInput value={state} defaultValue="hello world" onChange={onChange}></AntdInput>
    </>
    
  )
}

export default Demo;