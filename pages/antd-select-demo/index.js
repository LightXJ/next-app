import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

console.log(children)

export default function Demo(){
  return (
    <Select mode="tags" style={{ width: '100%' }} onChange={handleChange}>
      <Select.Option value="d">sd</Select.Option>
      {children}
    </Select>
  )
}