import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd';
import axios, {CancelTokenSource} from 'axios';
import styles from './index.module.css'


const TAB_LIST = [
  {
    key: '1',
    tabName: 'tab1',
    apiName: 'tabOne',
  },
  {
    key: '2',
    tabName: 'tab2',
    apiName: 'tabTwo'
  }
]
const DEFAULT_TAB = 'tab1';

export default function Home() {
  const cancelTokenRef = useRef<CancelTokenSource>();
  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState('');
  const [apiName, setApiName] = useState(TAB_LIST.find(item=>item.tabName===DEFAULT_TAB)?.apiName);

  // 先取消上一个tab的请求
  const fetchDataWithAbort = useCallback(()=>{
    cancelTokenRef.current && cancelTokenRef.current.cancel();
    cancelTokenRef.current = axios.CancelToken.source();
    
    setTimeout(()=>{
      setLoading(true);
    },0)

    interface ResponseResult {
      name: string
    }
    axios.post<ResponseResult>(`http://localhost:3000/api/${apiName}`, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          id: 1
        }),
    }, {
      cancelToken: cancelTokenRef.current.token
    })
    .then((res)=>{
      console.log(res);
      return res.data
    })
    .then(data=>{
      const { name } = data;
      setContentData(name);
    })
    .catch(err=>{
      console.log('err', err);
    })
    .finally(()=>{
      setLoading(false);
    })
  }, [apiName])

  // 不做任何处理
  // const fetchDataNormal = useCallback(()=>{
  //   setTimeout(()=>{
  //     setLoading(true);
  //   },0)

  //   axios.post(`http://localhost:3000/api/${apiName}`, {
  //     headers: {
  //       'Content-Type': 'text/plain;charset=utf-8'
  //       },
  //       body: JSON.stringify({
  //         id: 1
  //       }),
  //   })
  //   .then(res=>{
  //     return res.data
  //   })
  //   .then(data=>{
  //     setContentData(data.name);
  //   })
  //   .catch(err=>{
  //     console.log('err', err);
  //   })
  //   .finally(()=>{
  //     setLoading(false);
  //   })
  // }, [apiName]);

  useEffect(()=>{
    fetchDataWithAbort();
    // fetchDataNormal();
  }, [fetchDataWithAbort])


  const handleSwitchTab = (apiName: string) => {
    setApiName(apiName)
    setContentData('');
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>axios abort取消请求例子</h1>
        <p>
          tab2数据2秒内返回，tab1数据4秒内返回，如果不做任何处理从tab1快速切换到tab2,那么tab2会被渲染两次
          <br />
          先渲染成tabTwo, 然后等tab1数据返回后渲染为tabOne
        </p>

        <Tabs defaultActiveKey={DEFAULT_TAB} type='card' onChange={(activeKey)=>handleSwitchTab(activeKey)}>
          {TAB_LIST.map(item=>{
            return (
              <Tabs.TabPane tab={item.tabName} key={item.apiName}>
                {loading ? `正在加载${item.tabName}数据..`: contentData}
              </Tabs.TabPane>
            )
          })}
        </Tabs>

      </div>
    </>
  )
}
