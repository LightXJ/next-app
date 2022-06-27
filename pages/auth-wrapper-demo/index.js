import React, { useEffect, useState } from 'react';


function useAuthWrapper(){
  const [ authInfo, setAuthInfo ] = useState('');
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    function getAuthInfo(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve({
            userId: '11',
            userName: 'LightXJ',
          })
        }, 1000);
      })
    }
    setLoading(true);
    getAuthInfo().then(res=>{
      setAuthInfo(res);
      setLoading(false);
    }).catch(()=>{
      setAuthInfo('');
      setLoading(false);
    })
  }, []);

  if(loading){
    return {
      authInfo,
      component: ()=>(
        <div>auth loading....</div>
      )
    }
  }

  if(authInfo){
    return { 
      authInfo,
      component: ({ children })=>{
        console.log(children);
        return <>{children}</>
      }
    }
  }else{
    return {
      authInfo,
      component: ()=>(
        <div>您暂无权限</div>
      )
    }
  }
}

export default function Demo(){
  const { component: AuthComponent } = useAuthWrapper();

  return (
    <AuthComponent>
      <div>我是页面组件</div>
    </AuthComponent>
  )
}