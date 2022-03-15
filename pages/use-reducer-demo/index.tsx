import { useReducer } from 'react';
import { Button } from 'antd';


type actionType = 'add' | 'minus' | 'reset';
function reducer(state: number, action: actionType ){
  switch(action){
    case 'add':
      return state+1;
      break;
    case 'minus':
      return state-1;
      break;
    case 'reset':
      return DEFAULT_COUNT;
      break;
    default:
      throw new Error('error type');
  }
}

const DEFAULT_COUNT = 1;
export default function Index(){
  const [count, dispatch] = useReducer(reducer, DEFAULT_COUNT);

  return (
    <div>
      <p>数字：{count}</p>
      <Button onClick={()=>dispatch('add')}>+</Button>
      <Button onClick={()=>{dispatch('minus')}}>-</Button>
      <Button onClick={()=>dispatch('reset')}>重置</Button>
    </div>
  );
}

 Index;