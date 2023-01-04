export class FormStore {
  #store={};
  #fieldEntities={};
  #initialValues={};

  setInitialValues=(initialValues, init)=>{
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

  updateValue = (name, value)=>{
    if(name === undefined) return;
    const prevStore = this.#store;
    this.#store = { ...this.#store, [name]: value}
    this.#notifyObservers(prevStore, [name], {
      type: 'valueUpdate',
      source: 'internal'
    })
  }

  // 获取那些带name的Form.Item实例
  getFieldEntities = ()=>{
    return this.#fieldEntities.filter((field)=>field.prop.name);
  }

  //往fieldEntities注册Form.Item实例，每次Form.Item实例在componentDidMount时，都会调用该函数把自身注册到fieldEntities上
  // 最后返回一个解除注册的函数
  registerField = (entity)=>{
    this.#fieldEntities.push(entity);
    return ()=>{
      this.#fieldEntities = this.#fieldEntities.filter((item)=>item!==entity)
    }
  }

  // Form.Item实例化时，在执行constructor期间会调用该函数以更新initialValue
  initEntityValue = (entity)=>{
    const { initialValue, name } = entity;
    if(name!==undefined){
      const prevValue = this.#store[name];

      if(prevValue === undefined){
        this.#store = {...this.#store, [name]: initialValue }
      }
    }
  }

  #notifyObservers = (prevStore, namePathList, info)=>{
    const mergedInfo = {...info, store: this.getFieldsValue()}
    this.getFieldEntities().forEach(({onStoreChange})=>{
      onStoreChange(prevStore, namePathList, mergedInfo)
    })
  }

}