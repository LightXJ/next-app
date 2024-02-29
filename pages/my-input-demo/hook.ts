import React, { useLayoutEffect } from "react";

export const useLayoutUpdateEffect: typeof React.useEffect = (
  callback,
  deps,
) => {
  const firstMountRef = React.useRef(true);

  useLayoutEffect(() => {
    if (!firstMountRef.current) {
      return callback();
    }
  }, deps);

  // We tell react that first mount has passed
  useLayoutEffect(() => {
    firstMountRef.current = false;
    return () => {
      firstMountRef.current = true;
    };
  }, []);
};

const hasValue = (value) =>{
  return value !== undefined;
}

export const useMergedState = <T, R=T>(
  defaultStateValue: T | (()=>T),
  option?: {
    defaultValue?: T | (()=>T);
    value?: T;
    onChange?: (value: T, prevValue: T) => void;
    postState? : (value: T)=>T;
  }
) : [R, (value: T)=> void] => {
  const { defaultValue, value, onChange, postState } = option || {};

  const [innerValue, setInnerValue] = React.useState<T>(() => {
    if (hasValue(value)) {
      return value;
    }
    if (hasValue(defaultValue)) {
      return typeof defaultValue === 'function'
        ? (defaultValue as any)()
        : defaultValue;
    }
    return typeof defaultStateValue === 'function'
      ? (defaultStateValue as any)()
      : defaultStateValue;
  });

  let mergedValue = value !== undefined ? value : innerValue;

  if (postState) {
    mergedValue = postState(mergedValue);
  }

  function triggerChange(newValue: T) {
    setInnerValue(newValue);
    if (mergedValue !== newValue && onChange) {
      onChange(newValue, mergedValue);
    }
  }

  useLayoutUpdateEffect(() => {
    if (!hasValue(value)) {
      setInnerValue(value as T);
    }
  }, [value]);

  return [(mergedValue as unknown) as R, triggerChange];
}
