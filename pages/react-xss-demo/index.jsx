import React, { useState } from "react";

const Demo = ()=>{
  const [child] = useState({
    $$typeof: Symbol.for('react.element'),
    ref: null,
    type: 'div',
    props: {
      dangerouslySetInnerHTML: {
        __html: '<img src onerror="alert(1)"/>',
      },
    },
  });

  return (
    <div>
    {child}
    </div>
  )
}

export default Demo;