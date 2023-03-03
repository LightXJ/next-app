import * as React from 'react';
import { detectFlexGapSupported } from './style-checker';

const UseFlexGapSupport=() => {
  const [flexible, setFlexible] = React.useState(false);
  React.useEffect(() => {
    setFlexible(detectFlexGapSupported());
  }, []);

  return flexible;
};

export default UseFlexGapSupport;