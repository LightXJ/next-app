import React from "react";

export class FormStore {
  #store={};
  #fieldEntities={};
  #initialValues={};

  setInitialValue=(initialValues, init)=>{
    this.initialValues = initialValues || {}
    if(init){
      this.#store = {
        ...this.#store,
        ...initialValues
      }
    }
  }

  getFieldValue=(name)=>{
    return this.#store[name]
  }

  getFieldsValue = ()=>{
    return {...this.#store}
  }
}