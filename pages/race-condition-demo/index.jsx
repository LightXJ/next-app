import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = ()=>{
  const [id, setId] = useState(0);
  const [data, setData] = useState(null);

  const fetchData = async (abortController) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/${id}`, {
        signal: abortController.signal
      });
      const newData = await response.data;
      setData(newData);
    } catch (error) {
      if (error.name === 'AbortController') {
          // 中止获取操作会抛出一个错误
          // 因此我们不会更新旧响应数据
      }else{
        // 在此处理其他请求错误
        console.error('报错了', error);
        setData(null);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetchData(abortController);
    return () => {
        abortController.abort();
    }
  }, [id]);

  console.log(data);
  return (
    <div>
      {id}
      <button onClick={()=>setId(prev=>prev+1)}>发起请求</button>
      {data && <div>{data.name}</div>}
    </div>
  )
} 

export default Index;