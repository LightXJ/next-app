import React, { useRef, useMemo } from 'react';
import { FormStore } from './form-store';
import {Context as FieldContext} from './field-context';

console.log('FieldContext', FieldContext);

const Form = (props)=>{
  const { initialValues, children } = props;
  const formStore = useRef(new FormStore());

  const mountRef = useRef(false);
  if(initialValues){
    formStore.current.setInitialValues(initialValues, !mountRef.current);
  }
  if(!mountRef.current){
    mountRef.current = true;
  }

  const fieldContextValue = useMemo(()=>{
    return {
      formStore: formStore.current
    }
  }, []);

  // const wrapperNode = (
  //   <FieldContext.Provider value={fieldContextValue}>{children}</FieldContext.Provider>
  // )
  return <div>
    sdds
  </div>
}

export default Form;