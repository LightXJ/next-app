import React, { useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const TAB_LIST = [
  {
    type: 0,
    name: '电影',
  },
  {
    type: 1,
    name: '剧集',
  },
  {
    type: 2,
    name: '综艺',
  },
  // {
  //   type: 3,
  //   name: '网大',
  // },
  {
    type: 10,
    name: '影人',
  },
];


const Demo = ()=>{
  const [activeTab, setActiveTab] = useState(0)
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return (
    <Tabs
    size="small"
    type="line"
    activeKey={activeTab}
    onChange={handleTabChange}
  >
    {
      TAB_LIST.map(item => (
        <TabPane
          key={item.type}
          tab={item.name}
        >
          sd
        </TabPane>
      ))
    }
  </Tabs>
  )
}

export default Demo;