import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import { Button } from 'antd';

const initialList = [];
for (let i = 0; i < 10; i++) {
  initialList.push({ id: i, name: `name-${i}`, value: 0 });
}

const ListItem = React.memo((props)=>{
  const { item, onIncrease, onShiftDown } = props;
  console.log('render', item.id);
  return (
    <div className="list-item">
      {/* 假设这是一个复杂的组件 */}
      <span className="list-item-name">{item.name} </span>
      <span className="list-item-value">{item.value} </span>
      <Button onClick={()=>onIncrease(item)}>递增</Button>
      <Button onClick={()=>onShiftDown(item)}>下移</Button>
    </div>
  );
});

function useRefProps(props){
  const ref = useRef(props);
  
  // 每次渲染更新props;
  useEffect(()=>{
    ref.current = props;
  })
  return ref;
}

function List(props){
  const { list } = props;
  const propsRef = useRefProps(props);

  const handleIncrease = useCallback((item)=>{
    const { onIncrease } = propsRef.current;
    onIncrease(item);
  }, [propsRef])

  const handleShiftDown = useCallback((item)=>{
    const { onShiftDown } = propsRef.current;
    onShiftDown(item);
  }, [propsRef])

  return (
    <ul>
      {list.map((i) => (
        <> 
          <ListItem
            key={i.id}
            item={i}
            onIncrease={handleIncrease}
            onShiftDown={handleShiftDown}
          />
        </>
      ))}
    </ul>
  )
}

function ListDemo(){
  const [list, setList] = useState(initialList);

  const handleShiftDown = useCallback(item => {
    const idx = list.findIndex(i => i.id === item.id);
    if (idx !== -1 && idx < list.length - 1) {
      let newList = produce(list, draft=>{
        let t = draft[idx];
        draft[idx] = draft[idx + 1];
        draft[idx + 1] = t;
      })
      setList(newList);
    }
  }, [list]);

  const handleIncrease = useCallback(item=>{
    const idx = list.findIndex(i => i.id === item.id);
    let newList = produce(list, draft=>{
      draft[idx].value++;
    })
    setList(newList);
  }, [list])

  return (
    <div className="list-container">
      <List
        list={list}
        onShiftDown={handleShiftDown}
        onIncrease={handleIncrease}
      />
    </div>
  );
}



export default ListDemo;