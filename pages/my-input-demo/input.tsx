import React, {useState} from 'react';
import { useLayoutUpdateEffect } from './hook';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
}

function fixControlledValue<T>(value: T){
  if(typeof value === 'undefined' || value === null){
    return ''
  }
  return String(value);
}


const Input = (props: InputProps)=>{
  const { defaultValue, value, onChange, ...rest} = props;

  const [_value, setValue] = useState(()=>{
    if(typeof value !== 'undefined'){
      return value;
    }else{
      return defaultValue;
    }
  })

  /** 当外部 props.value 改变时，修改对应内部的 State  */
  useLayoutUpdateEffect(() => {
    setValue(value);
  }, [value]);

  const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const inputValue = e.target.value;
    // 当onChange触发时，需要判断
    // 1. 当外部传入的value === undefined，表示此时是非受控模式，那么组件内部应该直接使用控件value值的切换
    // 2. 相反，如果组件外部传入value !== undefined，表示此时为受控模式，那么组件内部的值应该由外部props中的value决定，而不是自主切换
    if(typeof value === 'undefined'){
      setValue(inputValue);
    }
    onChange && onChange(e);
  }
  

  console.log('_value', _value)

  return (
    <input value={fixControlledValue(_value)} onChange={onInternalChange} {...rest} />
  )
}

export default Input;