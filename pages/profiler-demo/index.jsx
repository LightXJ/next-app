import React from "react";
import { List, Avatar } from "antd";

 const style = {
   display: "flex",
   justifyContent: "space-around",
   maxWidth: 800,
   margin: "0 auto",
   padding: 60,
 };

 const Display = React.memo((props) => {
   console.log("Display");
   return <pre>{JSON.stringify(props.data, null, 2)}</pre>;
 }, (prev, next)=>{
   return JSON.stringify(prev) === JSON.stringify(next);
 });

const list = new Array(100).fill({
  name: {
    first: 'first name',
    last: 'last name',
    email: 'xxxx.email.com',
  }
})

// const PureListItem = React.memo(({ item }) => {
//   return (
//     <List.Item key={item.id}>
//       <List.Item.Meta
//         avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//         title={item.name.last}
//         description={item.email}
//       />
//       <div>{item.nat}</div>
//     </List.Item>
//   );
// });
// const Length100List = React.memo(({ data }) => {
//   return <List itemLayout="horizontal" dataSource={data} renderItem={(item) => <PureListItem item={item} />} />;
// });

const PureListItem = ({ item }) => {
  return (
    <List.Item key={item.id}>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={item.name.last}
        description={item.email}
      />
      <div>{item.nat}</div>
    </List.Item>
  );
};

const Length100List =({ data }) => {
  return <List itemLayout="horizontal" dataSource={data} renderItem={(item) => <PureListItem item={item} />} />;
};

 const Count = (props) => {
   console.log("count");
   return <p>{props.data}</p>;
 };

function onRenderCallback(...args){
  const [ id, phase, actualDuration, baseDuration ] = args;
  console.group();
  console.log('id', id);
  console.log('phase', phase);
  console.log('actualDuration：渲染Profiler和它的子代花费的时间', actualDuration);
  console.log('baseDuration', baseDuration);
  console.groupEnd();
}

 export default class ProfilerDemo extends React.Component {
   state = {
     count: 0,
   };
   handleAdd = () => {
     this.setState({
       count: this.state.count + 1,
     });
   };
   onChange = (key) => (e) => {
     this.setState({
       [key]: e.target.value,
     });
   };

   
   render() {
     const { text, password, count } = this.state;
     return (
       <div>
         <div style={style}>
           <div>
             <input type="text" value={text || ""} onChange={this.onChange("text")} />
             <br />
             <br />
             <input type="text" value={password || ""} onChange={this.onChange("password")} />
           </div>
           <Display data={{ text, password }} />
         </div>
         <div align="center">
           <Count data={count} />
           <button onClick={this.handleAdd}>add</button>
         </div>
         <div>
            <React.Profiler id="Length100List" onRender={onRenderCallback}>
              <Length100List data={list} />
            </React.Profiler>
            
          </div>;
       </div>
     );
   }
 }