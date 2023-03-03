/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Space from './space/index';
import { ConfigContext, defaultGetPrefixCls } from './space/config-provider';
import React from 'react';
import './index.sass';


const SpaceTest = () => (
  <ConfigContext.Provider value={
    {
      getPrefixCls: defaultGetPrefixCls,
      space: { size: 'large'}
    }
  }>
    <Space 
      direction="horizontal"
      align="end" 
      style={{height:'200px'}}
      split={<div className="box" style={{background: 'red'}}></div>} 
      wrap={true}
    >
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space>
    <Space 
      direction="horizontal"
      align="end" 
      style={{height:'200px'}}
      split={<div className="box" style={{background: 'red'}}></div>} 
      wrap={true}
    >
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space>
  </ConfigContext.Provider>
);

export default SpaceTest;