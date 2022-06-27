/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {Form, Space, Button, Input, Radio } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';


function SingleRule(props){
  const { field, remove } = props;
  console.log(field.name)
  return (  
    <Space key={field.key} align="baseline">
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, curValues) =>
        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
      }
    >
      {() => (
        <Form.Item
          {...field}
          label="Sight"
          name={[field.name, 'sight']}
          // rules={[{ required: true, message: 'Missing sight' }]}
        >
          <Radio.Group>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
      )}
    </Form.Item>
    <Form.Item
      {...field}
      label="Price"
      name={[field.name, 'tag']}
      // rules={[{ required: true, message: 'Missing price' }]}
    >
      <Input />
    </Form.Item>

    <MinusCircleOutlined onClick={() => remove(field.name)} />
  </Space>
  )
}

function InnerRuleItem(props){
  const { innerRuleField, remove, onActive, outerRuleName, activeKey } = props;

  console.log('InnerRuleItem activeKey', activeKey)
  const curName =  `${outerRuleName}-${innerRuleField.name}`;
  const isActive = activeKey === curName;
  console.log(isActive, 'isActive');

  return (
    <div
      style={{border: '1px dashed red', margin: 20, padding: 20, background: isActive ? 'antiquewhite':''}}
      key={innerRuleField.key} 
      onClick={()=>onActive(curName)}>
      <Form.List name={[innerRuleField.name, 'singleRuleList']}>
        {(singleRuleFields, { add, remove }) => (
          <>
            {singleRuleFields.map(field => (
              <SingleRule field={field} key={field.key} remove={remove} />
            ))}
          </>
        )}
    </Form.List>
    <Button onClick={()=>remove(innerRuleField.name)}>
      删除InnerRule
    </Button>
  </div>
  )
}

function OuterRuleItem(props){
  const { outerRuleField, remove, onActive, activeKey } = props;
  console.log(outerRuleField.name);
  return (
    <div style={{background: '#eee', marginTop: 20}}>
       <Form.List name={[`${outerRuleField.name}`, 'innerRuleList']}>
        {(innerRuleFields, { add, remove})=>{
            return (
              <div style={{border: '1px solid gray', 'margin': '20px'}}>
                {innerRuleFields.map((innerRuleField)=>{
                  return (
                    <InnerRuleItem
                      outerRuleName={outerRuleField.name}
                      innerRuleField={innerRuleField}
                      remove={remove}
                      key={innerRuleField.key}
                      onActive={onActive}
                      activeKey={activeKey}
                    />
                  );
                })}
                <Button onClick={()=>add()} shape="round" type="primary" ghost size="small">添加内层条件</Button>
            </div>
            )
        }}
      </Form.List>
      <Button onClick={()=>{remove(outerRuleField.name)}}>删除</Button>
    </div>
  )
}

export default function Demo(){

  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState();

  console.log('activeKey', activeKey);


  // 初始化，给表单赋值
  useEffect(()=>{
    form.setFieldsValue({
      outerRuleList: [
        {
          innerRuleList: [{
            singleRuleList: []
          }],
        }
      ]
    })
  }, [form])

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };


  const handleAddTag = () => {
    console.log('active', activeKey);
    const [outerRuleName, innerRuleName] = activeKey.split('-');

    console.log(outerRuleName, innerRuleName);
    let formValues = form.getFieldsValue();

    let matchObj = formValues.outerRuleList[outerRuleName].innerRuleList[innerRuleName]
    let curTag = { tag: Math.random() }
    if(matchObj.singleRuleList && matchObj.singleRuleList.length>0){
      matchObj.singleRuleList.push({...curTag})
    }else{
      matchObj.singleRuleList = [{...curTag}];
    }
    console.log('formValues', formValues);
    form.setFieldsValue(formValues)
  }

  const handleActive = useCallback((activeKey) => {
    setActiveKey(activeKey);
  }, []);

  return (
    <>
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="outerRuleList">
        {(outerRuleFields, {add, remove})=>{
          return (
            <div>
              {outerRuleFields.map(outerRuleField=>{
                return (
                  <OuterRuleItem
                    outerRuleField={outerRuleField}
                    remove={remove}
                    key={outerRuleField.key}
                    onActive={handleActive}
                    activeKey={activeKey}
                  />
                )
              })}
              <Button onClick={()=>add()}>添加外层条件</Button>
            </div>  
          )
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

        <Button onClick={handleAddTag}>添加Tag</Button>
      </Form.Item>
    </Form>
    </>
  )
}