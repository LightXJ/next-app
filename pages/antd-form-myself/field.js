import React from 'react';
import FieldContext from './FieldContext';
import { defaultGetValueFromEvent } from './utils/valueUtil';

function WrapperField(props){
  const fieldContext = React.useContext(FieldContext);
  return (
    <div style={{display: 'flex', marginBottom: 12}}>
      <div style={{width: 100}}>{props.label}</div>
      <Field {...props} fieldContext={fieldContext} />
    </div>
  )
}

class Field extends React.Component {
  $mounted = false;

  constructor(props){
    super(props);
    const { formStore } = props.fieldContext;
    formStore.initEntityValue(this);
  }

  componentDidMount(){
    this.mounted = true;
    this.props.fieldContext.formStore.registerField(this);
  }

  onStroeChange = (prevStore, namePathList, info)=>{
    const { store } = info;
    const prevValue = prevStore[this.props.name];
    const curValue = store[this.props.name];
    const nameMatch = namePathList && namePathList.incluedes(this.props.name);
    
    switch(info.type){
      default:
        if(nameMatch || (name !== undefined && prevValue !== curValue)){
          this.reRender();
          return;
        }
        break;
    }
  }

  reRender = ()=>{
    if(!this.mounted) return;
    this.forceUpdate();
  }

  // 生成要通过React.cloneElement隐式混入到控件里的prop
  getControlled = (childProps)=>{
    const {
      fieldContext,
      name,
      valuePropName = "value",
      getValueFromEvent,
      trigger="onChange",
    } = this.props;

    const value = name ? this.props.fieldContext.formStore.getFieldValue(name): undefined;
    const mergedGetValueProps = (val)=>({[valuePropName]: val});

    const control = {
      ...childProps,
      ...mergedGetValueProps(value)
    }

    // 先取出用户原本定义在控件的trigger(默认为onChange)上的方法
    const originTriggerFunction = childProps[trigger];
    control[trigger] = (...args)=>{
      let newValue;
      if(getValueFromEvent){
        newValue = getValueFromEvent(...args);
      }else{
        // 如果没有定义getValueFromEvent这类从event取值的方法，则调用defaultGetValueFromEvent方法取值
        // defaultGetValueFromEvent会从event.targetp[valuePropName]中取值
        newValue = defaultGetValueFromEvent(valuePropName, ...args);
      }

      // 调用updateValue更新formStore的store以及遍历调用fieldEntities里示例的onStateChange方法，
      // 也就是上面定义的onStateChange方法
      fieldContext.formStore.updateValue(name, newValue);
      if(originTriggerFunction){
        originTriggerFunction(...args);
      }
    }
    return control;
  }

  render = ()=>{
    const { children } = this.props;
    let returnChildNode;
    if(React.isValidElement(children)){
      returnChildNode = React.cloneElement(children, this.getControlled(children.props));
    }else{
      returnChildNode = children;
    }
    return returnChildNode;
  }
}

export default WrapperField;