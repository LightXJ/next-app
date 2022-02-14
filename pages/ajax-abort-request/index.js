import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd';
import $ from 'jquery';
import styles from './index.module.css';

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
  const requestRef = useRef();
  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState('');
  const [apiName, setApiName] = useState(TAB_LIST.find(item=>item.tabName===DEFAULT_TAB).apiName);


  // 先取消上一个tab的请求
  const fetchDataWithAbort = useCallback(()=>{
    requestRef.current && requestRef.current.abort();
    
    setTimeout(()=>{
      setLoading(true);
    },0)

    requestRef.current = $.ajax({
      url: `http://localhost:3000/api/${apiName}`,
      method: "POST",
      data: { id : 1 },
      success: (res)=>{
        console.log(res);
        setContentData(res.name);
      },
      error: (err)=>{
        console.log(err);
      },
    }).always(()=>{
      setLoading(false)
    })

    
  }, [apiName])

  useEffect(()=>{
    fetchDataWithAbort();
  }, [fetchDataWithAbort])


  const handleSwitchTab = (apiName) => {
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
        <h1>ajax abort取消请求例子</h1>
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
