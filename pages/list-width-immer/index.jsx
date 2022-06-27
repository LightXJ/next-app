import React, { useState } from 'react';
import produce from 'immer';

const initialList = [];
for (let i = 0; i < 10; i++) {
  initialList.push({ id: i, name: `name-${i}`, value: 0 });
}

// function List(){
//   const [list, setList] = useState(initialList);

//   console.log('List渲染');
//   return (
//     <div className="list-container">
//       <ul>
//         {list.map((i, idx) => (
//           <div className="list-item" key={i.id}>
//             {/* 假设这是一个复杂的组件 */}
//             {console.log('render', i.id)}
//             <span className="list-item-name">{i.name} </span>
//             <span className="list-item-value">{i.value} </span>
//             <button
//               className="list-item-increment"
//               onClick={() => {
//                 i.value++;
//                 console.log('递增');
//                 setList([...list]);
//               }}
//             >
//               递增
//             </button>
//             <button
//               className="list-item-increment"
//               onClick={() => {
//                 if (idx < list.length - 1) {
//                   console.log('移位');
//                   let t = list[idx];
//                   list[idx] = list[idx + 1];
//                   list[idx + 1] = t;
//                   setList([...list]);
//                 }
//               }}
//             >
//               下移
//             </button>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// }


function ListWithImmer(){
  const [list, setList] = useState(initialList);

  console.log('List渲染');
  return (
    <div className="list-container">
      <ul>
        {list.map((i, idx) => (
          <div className="list-item" key={i.id}>
            {/* 假设这是一个复杂的组件 */}
            {console.log('render', i.id)}
            <span className="list-item-name">{i.name} </span>
            <span className="list-item-value">{i.value} </span>
            <button
              className="list-item-increment"
              onClick={() => {
                let newList = produce(list, draft=>{
                  draft[idx].value++
                })
                console.log(newList === list);
                setList(newList);
              }}
            >
              递增
            </button>
            <button
              className="list-item-increment"
              onClick={() => {
                if (idx < list.length - 1) {
                  console.log('移位');
                  let newList = produce(list, draft=>{
                    let t = draft[idx];
                    draft[idx] = draft[idx + 1];
                    draft[idx + 1] = t;
                  })
                  setList(newList);
                }
              }}
            >
              下移
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ListWithImmer;
// export default List;