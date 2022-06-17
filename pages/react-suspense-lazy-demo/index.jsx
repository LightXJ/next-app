import React, { Suspense, useEffect } from 'react';

const OtherComponent = React.lazy(() => import('./other-component'));

export default function MyComponent() {


  useEffect(()=>{
    
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
