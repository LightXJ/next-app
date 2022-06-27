import { useCallback, useState } from 'react';


const isFunction = (value) => typeof value === 'function';

const useSetState =( initialState ) => {
  const [state, setState] = useState(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;