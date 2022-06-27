import React, { useState, useCallback, useEffect, useRef } from 'react';
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

function ListDemo(){
  const [list, setList] = useState(initialList);
  const listRef = useRef([]);

  useEffect(()=>{
    listRef.current = list;
  }, [list])

  const handleShiftDown = useCallback(item => {
    const list = listRef.current;
    const idx = list.findIndex(i => i.id === item.id);
    if (idx !== -1 && idx < list.length - 1) {
      let newList = produce(list, draft=>{
        let t = draft[idx];
        draft[idx] = draft[idx + 1];
        draft[idx + 1] = t;
      })
      setList(newList);
      console.log(newList[0] === list[0]);
    }
  }, []);

  const handleIncrease = useCallback(item=>{
    const list = listRef.current;
    const idx = list.findIndex(i => i.id === item.id);
    let newList = produce(list, draft=>{
      draft[idx].value++;
    })
    setList(newList);
  }, [])

  return (
    <div className="list-container">
      <ul>
        {list.map((i, index) => (
          <ListItem
            key={index}
            item={i} 
            onIncrease={handleIncrease}
            onShiftDown={handleShiftDown}
          />
        ))}
      </ul>
    </div>
  );
}


export default ListDemo;
// export default List;