import produce from 'immer';

export default function ImmerDemo(){
  // demo1
  let currentState = {
    a: [],
    p: {
      x: []
    }
  }
  
  let nextState = produce(currentState, (draft) => {
    draft.a.push(2);
  })

  console.log(nextState.a === currentState.a);
  console.log(nextState.p === currentState.p);


  // demo2
  let newState = produce(currentState, (draft)=>{
    draft.p.x.push(2);
  })
  // newState.a = 1;
  console.log(newState === currentState);


  // demo3
  const initialList = [];
  for (let i = 0; i < 10; i++) {
    initialList.push({ id: i, name: `name-${i}`, value: 0 });
  }

  let newList = produce(initialList, (draft)=>{
    draft[0].value++;
  })
  console.log('newList === initialList', newList === initialList);
  console.log('newList[1] === initialList[1]', newList[1] === initialList[1]);
}

