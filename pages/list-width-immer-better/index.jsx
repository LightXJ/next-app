import React, { useState, useCallback } from 'react';
import produce from 'immer';
import { Button } from 'antd';

const initialList = [];
for (let i = 0; i < 10; i++) {
  initialList.push({ id: i, name: `name-${i}`, value: 0 });
}

const ListItem = React.memo((props)=>{
  const { item } = props;
  console.log('render', item.id);
  return (
    <div className="list-item">
      {/* 假设这是一个复杂的组件 */}
      <span className="list-item-name">{item.name} </span>
      <span className="list-item-value">{item.value} </span>
    </div>
  );
});

function ListWithImmer(){
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
      <ul>
        {list.map((i) => (
          <> 
            <ListItem
              key={i.id}
              item={i} 
            />
            <Button onClick={()=>handleIncrease(i)}>递增</Button>
            <Button onClick={()=>handleShiftDown(i)}>下移</Button>
          </>
       
        ))}
      </ul>
    </div>
  );
}


export default ListWithImmer;
// export default List;