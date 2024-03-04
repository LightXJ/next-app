import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { queryScheduleOverview } from './fetch';
import { Button } from 'antd';

function App() {
  const [data, setData] = useState('');

  const { runAsync: runGetData } = useRequest(queryScheduleOverview, {
    manual: true,
  });

  const handleGetData = ()=>{
    runGetData()
    .then(res=>{
      setData(res);
    })
    .catch(err=>{
      console.error(err);
    })
  }

  return (
    <div>
      <Button onClick={handleGetData}>获取新数据</Button>
      数据为{data}
    </div>
    
  );
}

export default App;